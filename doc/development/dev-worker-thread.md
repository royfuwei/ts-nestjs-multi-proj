Worker Threads
===

## 啟動Worker Threads

`src/infrastructures/worker`配置Worker Threads，透過`InfraWorker`註冊服務。

```sh
src/
|-- infrastructures
|   `-- worker # 產生 worker thread
`-- main.ts
```


## Worker Threads 啟用服務

worker 主要啟動`infra/Server`, `infra/Schedule`兩個服務

### infrastructures/server


#### infrastructures/server DI
以下為**Server**注入的功能模組

```sh
src/
|-- infrastructures
|   |-- server # nestjs api server
|   |   |-- di
|   |   |   `-- RootModule.ts
|   |   `-- server.ts
```

DI [src/infrastructures/server/di/RootModule.ts](../../src/infrastructures/server/di/RootModule.ts):
```ts
@Module({
  imports: [MongodbModule, AppModule, SSOModule],
})
export class RootModule {}
```

#### infrastructures/server app

Worker Threads 註冊 server app: [src/infrastructures/server/server.ts](../../src/infrastructures/server/server.ts)

```sh
src/
|-- infrastructures
|   |-- server # nestjs api server
|   |   `-- server.ts
```

#### server app 使用的module

core 的`AppModule, SSOModule`:
- **controller**:  nestjs api 使用，產生swagger。
- **service**: 模組內部使用service，不注入其他模組功能。
- **usecase**: 模組使用`InfraCoreProviders` 整合其他服務的功能。
- **dto**: 模組使用的資料定義。
- **module.ts**: 模組設定，有新建`service, controller, usecase`，需要到模組的`InfraCoreRegister`註冊設定。

開發sso login api
`core/sso`需要註冊`PROJECT_TYPE.{project}`。

`core/sso`:
```sh
src/
|-- core 模組
|   |-- sso
|   |   |-- controller # 各專案 sso login 整合api
|   |   |   `-- {project}.controller.ts
|   |   |-- dto
|   |   |   `-- core.sso.dto.ts
|   |   |-- service
|   |   |   `-- default.service.ts
|   |   |-- sso.module.ts
|   |   `-- usecase # 整合其他模組服務
|   |       `-- {project}.usecase.ts
```


---

### infrastructures/schedule


#### infrastructures/schedule DI

以下為**Schedule**注入的功能模組

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

#### infrastructures/schedule app

Worker Threads 註冊 schedule app: [src/infrastructures/schedule/schedule.ts](../../src/infrastructures/schedule/schedule.ts)

```sh
src/
|-- infrastructures
|   |-- schedule # 排程服務 & 排程服務api
|   |   `-- schedule.ts
```

#### schedule app 使用的module

core 的`InfraScheduleModule`:

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
  - **{project}.controller.ts**: 使用`default.usecase.ts` 註冊專案排程服務
- **service**: 模組內部使用service，不注入其他模組功能。
- **usecase**: 模組使用`InfraCoreProviders` 整合其他服務的功能。
  - **default.usecase.ts**: 共用註冊排程設定。
  - **{project}.usecase.ts**: 排程邏輯整合。
- **dto**: 模組使用的資料定義。
- **module.ts**: 模組設定，有新建`service, controller, usecase`，需要到模組的`InfraCoreRegister`註冊設定。

