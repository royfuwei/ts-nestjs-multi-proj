開發功能模組
===

## core模組內功能

- **controller**: server nestjs api 使用 | schedule 執行排程使用。
- **service**: 模組內部使用service，不注入其他模組功能。
- **usecase**: 模組使用`InfraCoreProviders` 整合其他服務的功能。
- **repository**: 模組有使用到db 整合成一個repo service。
- **dto**: 模組使用的資料定義。
- **schemas**: 模組資料 mongoose schema 定義。
- **module.ts**: 模組設定，有新建`service, controller, usecase`，需要到模組的`InfraCoreRegister`註冊設定。

### 共用模組與專案模組

共用模組與專案模組是依據`src/constants.ts`的enum `PROJECT_TYPE`來決定。

```shell
src/
|-- constants.ts # 常用參數
```

配置`PROJECT_TYPE`，在`src/constants.ts` 配置專案名稱，作為專案DI使用。

- `COMMON`: 為通用模組功能。
- `DEFAULT`,`PROJECT`: 皆為專案模組，啟用時會根據`.env`PROJECT_TYPE設定 `InitConfigs.PROJECT_TYPE`決定DI模組。

```ts
export enum PROJECT_TYPE {
  /**
   * 內部使用，共用的project type
   */
  COMMON = 'common',
  /**
   * default
   */
  DEFAULT = 'default',
  /**
   * 專案
   */
  PROJECT = 'project',
}
```

配置`CORE_TYPE`，在`src/constants.ts`來分類功能模組，作為功能DI使用。

```ts
/**
 * infra core 的功能定義 enum
 * 給infra core decorator, service, controller 區分project type 使用
 */
export enum CORE_TYPE {
  /**
   * api track: 取得 api 的歷程
   */
  API_TRACK = 'api-track',
  /**
   * app: app 初始內容
   */
  APP = 'app',
  /**
   *  auth 相關模組
   */
  AUTH = 'auth',
  /**
   * schedule 排程相關模組
   */
  SCHEDULE = 'schedule',
  ...
}
```

### 共用與專案模組開發上的使用方式

#### controller

controller 是使用裝飾器`InfraCoreControllers`，來註冊controller 服務。
- 共用模組
  ```ts
  @InfraCoreControllers(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE)
  @Controller('schedule')
  @ApiExtraModels(PaginatedDTO, CronJobStatusDTO)
  export class ScheduleController implements ScheduleServiceInterface {
    constructor(private schedulerRegistry: SchedulerRegistry) {}

    private readonly logger = new Logger(ScheduleController.name);
  ```
- 專案模組
  ```ts
  @InfraCoreControllers(PROJECT_TYPE.PROJECT, CORE_TYPE.SCHEDULE)
  @Controller('schedule')
  export class PROJECTScheduleController implements ScheduleServiceInterface {
    constructor(
      private readonly PROJECTScheduleUCase: PROJECTScheduleUseCase,
      private readonly scheduleUseCase: ScheduleUseCase,
    ) {}
  ```
#### service, usecase, repository

service, usecase, repository 是使用裝飾器`InfraCoreProviders`，來註冊模組服務。
- 共用模組
  ```ts
  @InfraCoreProviders(
    {
      imports: [],
      providers: [],
    },
    PROJECT_TYPE.COMMON,
    CORE_TYPE.SCHEDULE,
  )
  @Injectable()
  export class ScheduleUseCase {
    constructor(private schedulerRegistry: SchedulerRegistry) {}

    private logger = new Logger(ScheduleUseCase.name);
  ```
- 專案模組
  ```ts
  @InfraCoreProviders(
    {
      imports: [
        SyncDataModule,
        AuthModule,
        ApiTrackModule,
        TmpModule,
        MailModule,
      ],
      providers: [],
    },
    PROJECT_TYPE.PROJECT,
    CORE_TYPE.SCHEDULE,
  )
  @Injectable()
  export class PROJECTScheduleUseCase {
    constructor(
      private readonly tmpRepository: TmpRepository,
      private readonly syncDataRepository: PROJECTSyncDataRepository,
      private readonly syncDataUseCase: PROJECTSyncDataUseCase,
      private readonly authSvcService: AuthSvcService,
      private readonly authService: AuthService,
      private readonly tmpUseCase: TmpUseCase,
      private readonly PROJECTMailUseCase: PROJECTMailUseCase,
    ) {}
  ```

### module

module 的功能為註冊core.controllers, core.services, core.usecase, core.repository，觸發decorator，並將專案模組注入nestjs `@Module`。

#### `@InfraCoreRegister` 為 sync-adapter 觸發decorator:
- **controllers**: core.controllers 觸發decorator。
- **services**: core.services, core.usecase, core.repository 觸發decorator。


#### `@Module` nestjs 功能搭配 sync-adapter decorator:
- **imports**:
  - `ScheduleModule.forRoot()`: 使用nestjs [Task Scheduling](https://docs.nestjs.com/techniques/task-scheduling)。
  - infra/decorators `getInfraCoreProviderImports`:
    - `PROJECT_TYPE.COMMON`: 注入共用模組。
    - `InitConfigs.PROJECT_TYPE`: 注入個別專案模組。
- **controllers**:
  - infra/decorators `getInfraCoreControllers`:
    - `PROJECT_TYPE.COMMON`: 注入共用模組。
    - `InitConfigs.PROJECT_TYPE`: 注入個別專案模組。
- **providers**:
  - infra/decorators `getInfraCoreProviders`:
    - `PROJECT_TYPE.COMMON`: 注入共用模組。
    - `InitConfigs.PROJECT_TYPE`: 注入個別專案模組。
- **exports**:
  - infra/decorators `getInfraCoreProviders`:
    - `PROJECT_TYPE.COMMON`: 注入共用模組。
    - `InitConfigs.PROJECT_TYPE`: 注入個別專案模組。

```ts
@InfraCoreRegister({
  controllers: [ScheduleController, PROJECTScheduleController],
  services: [ScheduleUseCase, PROJECTScheduleService, PROJECTScheduleUseCase],
})
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ...getInfraCoreProviderImports(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviderImports(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  controllers: [
    ...getInfraCoreControllers(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreControllers(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  providers: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  exports: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
})
export class InfraScheduleModule {}
```
