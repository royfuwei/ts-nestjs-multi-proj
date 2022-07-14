功能開發前定義介面
===

## `src/domain` 功能開發前定義介面
- common: 定義interface, class
- customize: (客製化預留)定義interface, class
- dto: 定義共用的 dto
- orm: orm 配置
  - entity, migrations, subscribers: 目前只有entity 會用。
    - entity: 用資料夾${PROJECT_TYPE}區分專案。

```sh
src/
|-- domain # 功能開發前 定義介面
|   |-- common # 定義interface, class
|   |-- customize # (客製化預留)定義interface, class
|   |-- dto # 定義共用的 dto
|   `-- orm # orm 配置
|       |-- entity # 依據專案配置，產生資料夾
|       |   `-- {project} # 專案配置
|       |       |-- {DB}
|       |       |   |-- MailLog.ts
|       |-- migrations # 預留
|       `-- subscribers # 預留
```
