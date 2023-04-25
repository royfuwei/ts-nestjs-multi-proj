ts-nestjs-multi-proj 基礎設施
===

## `src/infrastructures` ts-nestjs-multi-proj 基礎設施
- common: nestjs 共用功能, ex: pipe。
- decorators: ts-nestjs-multi-proj 配置裝飾器，用於區分專案注入模組。
- orm: orm 配置，自動根據專案配置orm。
- schedule: 排程服務 & 排程服務api, port: `15007`。
- server: nestjs api server, port: `5007`。
- worker: 產生 worker thread。


```sh
src/
|-- infrastructures
|   |-- common # nestjs 共用功能, ex: pipe
|   |   `-- pipes
|   |       |-- req-body-validation.pipe.ts
|   |       `-- req-validation.pipe.ts
|   |-- decorators # ts-nestjs-multi-proj 配置裝飾器
|   |   |-- controller.decorator.ts
|   |   |-- core.decorator.ts
|   |   |-- provider.decorator.ts
|   |   `-- tools.ts
|   |-- orm # orm 配置
|   |   `-- static.ts # 自動根據專案配置orm
|   |-- schedule # 排程服務 & 排程服務api
|   |-- server # nestjs api server
|   `-- worker # 產生 worker thread
`-- main.ts
```
