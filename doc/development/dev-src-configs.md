專案開發config 設定
===

開發上，專案env 可以分，基礎env,
## 基礎env

由[src/configs/init.ts](../../../src/configs/init.ts) 設定
```shell
src/
|-- configs 
|   `-- init.ts # 初始化配置 env
```

`.env`:
```shell
MONGO_ADDR=root:root@mongodb:27017/?authSource=admin&tls=true&tlsInsecure=true
APP_ID=TWBOS00129
RE_SYNC_DAYS='10'
API_TIMEOUT='600000'
RETRY_PERIOD='1000'
RETRY_TIMES='60'
TZ=Asia/Taipei
PROJECT_TYPE=
PROJECT_INIT_CONFIG=
```

## 專案增加的env, json

### 專案的`.env`:

各專案配置`.env` 內容可以參考[helm/ts-clean-arch/values.yaml](../../helm/ts-clean-arch/values.yaml)。

```shell
TASK_FREQ='0 30 6 * * *'
TASK_MAIL_FREQ='0 0 9 * * *'
```

### 專案的`configs.json, ormconfigs.json`:

ex: 專案

透過`.env`的`PROJECT_TYPE`, `PROJECT_INIT_CONFIG` 決定config 使用哪個資料夾位置。

`./` 目錄結構
```sh
.
|-- initial # 放置客製化config
|   |-- default
|   `-- {project} # 專案配置: PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG=''
```

#### configs.json:
- 客戶端的配置`{project}`:
  - `PROJECT_TYPE＝{project}`
  - [helm/ts-clean-arch/initial/{project}/configs.json](../../../helm/ts-clean-arch/initial/{project}-sit/configs.json)
- 客戶端的配置`{project}-sit`:
  - `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-sit`
  - [helm/ts-clean-arch/initial/{project}-sit/configs.json](../../../helm/ts-clean-arch/initial/{project}-sit/configs.json)
- 客戶端的配置`{project}-uat`:
  - `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-uat`
  - [helm/ts-clean-arch/initial/{project}-uat/configs.json](../../../helm/ts-clean-arch/initial/{project}-sit/configs.json)

#### ormconfigs.json:

- 客戶端的配置`{project}`:
  - `PROJECT_TYPE＝{project}`
  - [helm/ts-clean-arch/initial/{project}/ormconfigs.json](../../helm/ts-clean-arch/initial/{project}-sit/ormconfigs.json)
- 客戶端的配置`{project}-sit`:
  - `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-sit`
  - [helm/ts-clean-arch/initial/{project}-sit/ormconfigs.json](../../helm/ts-clean-arch/initial/{project}-sit/ormconfigs.json)
- 客戶端的配置`{project}-uat`:
  - `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-uat`
  - [helm/ts-clean-arch/initial/{project}-uat/ormconfigs.json](../../helm/ts-clean-arch/initial/{project}-sit/ormconfigs.json)


與程式開發對應的位置

```sh
src/
|-- configs 
|   |-- custom.ts # 功能取得開發使用的客製化配置json檔案(initial/${PROJECT_INIT_CONFIG | PROJECT_INIT}/configs.json)。
|   |-- customize # 專案客製化參數配置
|   |   `-- {project}.dto.ts # 專案客製化參數配置(env, json 整合)
```

