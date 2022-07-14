專案config配置
===

## 目錄結構

### ./ 目錄結構
```sh
.
|-- initial # 放置客製化config
|   |-- default
|   |-- {project}-test # 本地端開發配置
|   `-- {project} # 專案配置
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
|-- domain # 功能開發前 定義介面
|   `-- orm # orm 配置
|       |-- entity # 依據專案配置，產生資料夾
|       |   `-- {project} # 專案配置
|       |       |-- {DB01}
|       |       |   |-- MailLog.ts
|       |       |   `-- TGsRecordIndex.ts
|       |       `-- {DB02}
|       |           |-- SSO_APLogControl.ts
|       |           `-- SSO_APLoginLog.ts
`-- main.ts
```
