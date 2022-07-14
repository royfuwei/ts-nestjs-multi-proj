專案開發排程服務
===

## infrastructures/schedule


### RootModule DI

專案開發排程服務，會透過以下為**src/infrastructures/schedule**注入的功能模組

```sh
src/
|-- infrastructures
|   |-- schedule # 排程服務 & 排程服務api
|   |   |-- di
|   |   |   `-- RootModule.ts
```

DI [src/infrastructures/schedule/di/RootModule.ts](../../src/infrastructures/schedule/di/RootModule.ts):

```ts
@Module({
  imports: [MongodbModule, InfraScheduleModule],
})
export class RootModule {}
```

> **Schedule**會從`InfraScheduleModule`根據專案依賴注入不同的服務。


#### infrastructures/schedule app

Worker Threads 註冊 schedule app: [src/infrastructures/schedule/schedule.ts](../../src/infrastructures/schedule/schedule.ts)。

```sh
src/
|-- infrastructures
|   |-- schedule # 排程服務 & 排程服務api
|   |   `-- schedule.ts
```

[infra/schedule/schedule.ts](../../src/infrastructures/schedule/schedule.ts) 會自動取得專案的`core/shcedule/controller`，app 啟動時會依據[ScheduleServiceInterface](../../src/domain/common/core.schedule.ctl.ts)，執行`run`,`schedule`。

```ts
export class InfraSchedule implements InfraThreadService {
  app: NestExpressApplication;

  constructor(private port: number = InitConfigs.SCHEDULE_PORT) {}

  private readonly logger = new Logger(InfraSchedule.name);

  async run() {
    this.app = await NestFactory.create(RootModule);
    await this.runScheduleController();
    this.buildAPIDocumentation(this.app);
    this.app.listen(this.port);
    this.log();
  }

  private async runScheduleController() {
    const hasScheduleController = checkInfraCoreControllerProvider(
      InitConfigs.PROJECT_TYPE,
      CORE_TYPE.SCHEDULE,
    );
    const scheduleCtlProvideKey = getInfraCoreCtlProvideKey(
      InitConfigs.PROJECT_TYPE,
      CORE_TYPE.SCHEDULE,
    );
    if (hasScheduleController) {
      const scheduleController: ScheduleServiceInterface = this.app.get(
        scheduleCtlProvideKey,
      );
      await scheduleController.run();
      await scheduleController.schedule();
    } else {
      this.logger.log(`hasScheduleController: ${hasScheduleController}`);
    }
  }
```
---

## 專案開發排程服務

schedule app 使用[core schedule module](../../src/core/schedule/schedule.module.ts) 的`InfraScheduleModule`:

```sh
src/
|-- core 模組
|   |-- schedule # schedule 模組
|   |   |-- controller # default.controller.ts 以外，開放給infra 使用(schedule, server...)
|   |   |   |-- default.controller.ts # api(port:15007): 取得排程狀態, 暫時更改排程時間
|   |   |   `-- {project}.controller.ts # 配置、執行專案排程，開放給infra 使用
|   |   |-- dto
|   |   |-- schedule.module.ts
|   |   |-- service # 存放一些共用的功能，開放給別的功能模組使用，盡量減少注入其他服務
|   |   `-- usecase
|   |       |-- default.usecase.ts # 共用註冊排程功能
|   |       `-- {project}.usecase.ts # 專案排程usecase
```

- **controller**: schedule 執行排程使用。
  - **default.controller.ts**: schedule api: 取得排程狀態, 暫時更新排程時間。
  - **{project}.controller.ts**: 使用`default.usecase.ts` 註冊專案排程服務。
- **service**: 模組內部使用service，不注入其他模組功能。
- **usecase**: 模組使用`InfraCoreProviders` 整合其他服務的功能。
  - **default.usecase.ts**: 共用註冊排程設定。
  - **{project}.usecase.ts**: (專案)排程邏輯整合。
- **dto**: 模組使用的資料定義。
- **module.ts**: 模組設定，有新建`service, controller, usecase`，需要到模組的`InfraCoreRegister`註冊設定。


專案的schedule controller，需要`implements ScheduleServiceInterface`，`InfraSchedule`啟動時會依據interface，執行`run`,`schedule`。

專案schedule controller:
- **run**: 預留啟動時執行服務。
- **schedule**: 配置排程。


[ScheduleServiceInterface](../../src/domain/common/core.schedule.ctl.ts): 
```ts
export interface ScheduleServiceInterface extends Object {
  /**
   * 服務啟用即時執行
   */
  run(): Promise<void>;
  /**
   * 服務設定執行排程
   */
  schedule(): Promise<void>;
}
```

ex [src/core/schedule/controller/{project}.controller.ts](../../src/core/schedule/controller/{project}.controller.ts):

```ts
@InfraCoreControllers(PROJECT_TYPE.Project, CORE_TYPE.SCHEDULE)
@Controller('schedule')
export class ProjectScheduleController implements ScheduleServiceInterface {
  constructor(
    private readonly ProjectScheduleUCase: ProjectScheduleUseCase,
    private readonly scheduleUseCase: ScheduleUseCase,
  ) {}

  config: CustomConfigsDTO = ProjectConfigs.config();
  private readonly logger = new Logger(ProjectScheduleController.name);

  async run(): Promise<void> {
    this.logger.log('[run] start');
    await this.ProjectScheduleUCase.run();
    this.logger.log('[run] end');
  }

  /**
   * 專案註冊排程服務
   */
  async schedule(): Promise<void> {
    this.logger.log('[schedule] start');
    this.scheduleUseCase.addSchedule(
      'bank30Job',
      this.config.TASK_FREQ,
      async () => {
        await this.ProjectScheduleUCase.schedule();
      },
    );
    this.scheduleUseCase.addSchedule(
      'caseJob',
      this.config.TASK_MAIL_FREQ,
      async () => {
        await this.ProjectScheduleUCase.scheduleInfraAmiCaseGroupMail();
      },
    );
    this.logger.log('[schedule] end');
  }
}
```