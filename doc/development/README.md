開發相關文件
===

## 開發文件
- [基礎設施](src-infrastructures.md)
- [專案config配置](src-configs.md)
- [功能模組](src-core.md)
- [功能開發前定義介面](src-domain.md)
- [開發功能模組](dev-src-core.md)
- [dev-專案開發config 設定](dev-src-configs.md)
- [dev-專案配置外部資料庫](dev-typeorm-custom.md)
- [dev-Worker Threads](dev-worker-thread.md)
- [dev-專案開發排程服務](dev-schedule.md)

---

## 開發需求
- 盡量讓不同的客製化部分，可以在此服務使用。
- 使用Typescript Clean Architecture。
- 區分客戶，資料庫多樣化支援(使用typeorm)，且支援同一服務連線不同資料庫位置(支援多db連線)。
- 以配置方式，區分不同客製化，減少使用分之管理。
- 主要服務有 api server(使用nestjs), schedule, worker
- infra 使用nestjs 注入方式。

---

## infrastructure 的部分使用 nestjs

### Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

### Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

---

## 目錄結構

### ./ 目錄結構
```sh
.
|-- README.md
|-- dist
|-- doc # 文件
|-- helm
|-- initial # 放置客製化config
|   |-- default
|   `-- {project} # 專案配置
|-- nest-cli.json
|-- node_modules
|-- package-lock.json
|-- package.json
|-- src # 開發位置
|-- test
|-- tsconfig.build.json
`-- tsconfig.json
```

### ./src 目錄結構
```sh
src/
|-- configs 
|   |-- custom.ts # 功能取得開發使用的客製化配置json檔案(initial/${PROJECT_INIT_CONFIG | PROJECT_INIT}/configs.json)。
|   |-- customize # 專案客製化參數配置
|   |   `-- {project}.dto.ts # 專案客製化參數配置(env, json 整合)
|   `-- init.ts # 初始化配置 env
|-- constants.ts # 常用參數
|-- core 模組
|   |-- app
|   |-- mongodb
|   |-- schedule # schedule 模組
|   |-- sso
|   `-- utilHelper
|-- domain # 功能開發前 定義介面
|   |-- common # 定義interface, class
|   |-- customize # (客製化預留)定義interface, class
|   |-- dto # 定義共用的 dto
|   `-- orm # orm 配置
|       |-- entity # 依據專案配置，產生資料夾
|       |-- migrations # 預留
|       `-- subscribers # 預留
|-- infrastructures
|   |-- common # nestjs 共用功能, ex: pipe
|   |-- decorators # 配置裝飾器
|   |-- orm # orm 配置
|   |   `-- static.ts # 自動根據專案配置orm
|   |-- schedule # 排程服務 & 排程服務api
|   |-- server # nestjs api server
|   `-- worker # 產生 worker thread
`-- main.ts
```
