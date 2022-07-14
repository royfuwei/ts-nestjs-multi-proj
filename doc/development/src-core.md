功能模組
===

## `src/core`現有的功能模組
- schedule: 跟排程相關的功能模組
- sso: 與外部對接的sso 功能模組。
- utilHelper: 共用功能模組，ex: retry。

```sh
src/
|-- core # 功能模組
|   |-- app
|   |   |-- app.module.ts
|   |   |-- controller
|   |   |-- dto
|   |   `-- service
|   |-- auth
|   |   |-- auth.module.ts
|   |   |-- dto
|   |   |-- repository
|   |   |-- service
|   |   |   `-- default.service.ts
|   |   `-- usecase
|   |       `-- default.usecase.ts
|   |-- mail # mail 告警功能
|   |   |-- mail.module.ts
|   |   |-- service
|   |   `-- usecase
|   |-- mongodb
|   |   |-- dto
|   |   `-- mongodb.module.ts
|   |-- schedule # schedule 模組
|   |   |-- controller # default.controller.ts 以外，開放給infra 使用(schedule, server...)
|   |   |   |-- default.controller.ts # api(port:15007): 取得排程狀態, 
|   |   |   `-- {project}.controller.ts # 配置、執行專案排程，開放給infra 使用
|   |   |-- dto
|   |   |-- schedule.module.ts
|   |   |-- service # 存放一些共用的功能，開放給別的功能模組使用，盡量減少
|   |   `-- usecase
|   |       |-- default.usecase.ts # 共用註冊排程功能
|   |       `-- {project}.usecase.ts # 專案排程usecase
|   |-- sso
|   |   |-- controller # 各專案 sso login 整合api
|   |   |-- dto
|   |   |-- service
|   |   |-- sso.module.ts
|   |   `-- usecase
|   |-- syncdata # 客製化同步資料的位置(db, api...)
|   |   |-- dto
|   |   |-- repository # 客製化連接的db
|   |   |-- service
|   |   |-- syncdata.module.ts
|   |   `-- usecase
|   `-- utilHelper
|       |-- service
|       |   `-- default.service.ts
|       `-- utilHelper.module.ts
```
