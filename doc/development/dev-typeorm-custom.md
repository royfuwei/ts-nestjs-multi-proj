專案配置外部資料庫
===

連接外部資料庫，會因專案設定不同，會需要能夠配置專案需求的資料庫，又因為專案連接外部資料庫，不一定只有一個DB連線需求，所以會需要能夠連線多個資料庫。

開發上使用 `typeorm`。

## 使用流程

### initial ormconfigs 配置

依據各專案db連線配置，會放置`initial/${project}`資料夾底下的`ormconfigs.json`。



```sh
./ 目錄結構
|-- initial # 放置客製化config
|   |-- default
|   `-- {project} # 專案配置: PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG=''
```

`${project}` 會依據`.env`以下兩個欄位:
```shell
PROJECT_TYPE={project}
PROJECT_INIT_CONFIG={project}-test
```

規則會如下:
- 客戶端的配置`{project}`:
  - env: `PROJECT_TYPE＝{project}`
  - [helm/ts-nestjs-multi-proj/initial/{project}/ormconfigs.json](../../helm/ts-nestjs-multi-proj/initial/{project}-sit/ormconfigs.json)
- 客戶端的配置`{project}-sit`:
  - env: `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-sit`
  - [helm/ts-nestjs-multi-proj/initial/{project}-sit/ormconfigs.json](../../helm/ts-nestjs-multi-proj/initial/{project}-sit/ormconfigs.json)
- 客戶端的配置`{project}-uat`:
  - env: `PROJECT_TYPE＝{project}, PROJECT_INIT_CONFIG＝{project}-uat`
  - [helm/ts-nestjs-multi-proj/initial/{project}-uat/ormconfigs.json](../../helm/ts-nestjs-multi-proj/initial/{project}-sit/ormconfigs.json)




`ormconfigs.json` 管理參數，參數配置可以參考官網[using-ormconfigjson](https://typeorm.io/#/using-ormconfig/using-ormconfigjson)，其中主要參數配置:

- **type**: orm db類型
- **name**: db名稱，以連接多台DB連線方式配置，此配置辨識名稱，用來後續辨識不同DB 的`ORM Entity`，以及程式內專案設定檔`initial/${project}/configs.json` || `src/configs`。

ex `initial/{project}-test/ormconfigs.json`:
增加設定
```json
[
    {
        "type": "mssql",
        "name": "AUDIT_LOG_PSLDB",
        "host": "192.168.2.30",
        "username": "account",
        "password": "password",
        "port": 1434,
        "database": "dbname",
        "synchronize": false,
        "logging": false,
        "options": {
            "encrypt": false
        }
    }
    ...
]
```

### 配置專案`ORM Entity`



### Repository 注入專案 ORM


`InfraORM` 注入專案連線設定，透過[src/infrastructures/orm/static.ts](../../src/infrastructures/orm/static.ts) 的`InfraORM`，動態取得專案的`ormconfigs.json` 連線配置。

建議在`core/${module}/repository`的`InfraCoreProviders`，注入typeorm 的`Connection`, `EntityManager`。

ex: [src/core/syncdata/repository/{project}.repo.ts](../../src/core/syncdata/repository/{project}.repo.ts)
```ts
@InfraCoreProviders(
  {
    imports: [
      ...InfraORM.getImportModules(),
      TypeOrmModule.forFeature(
        [EmpShare, DailyEmpShareLog],
        {project}Configs.config().{project}_DB_EMP,
      ),
      TypeOrmModule.forFeature(
        [AcDELLog, TsSsoAcInfo],
        {project}Configs.config().{project}_DB_AC_TS,
      ),
      TypeOrmModule.forFeature(
        [SsoAPLogControl, SsoAPLoginLog],
        {project}Configs.config().{project}_DB_SSO_AP_LOG,
      ),
      TypeOrmModule.forFeature(
        [PSControl, PSLogData],
        {project}Configs.config().{project}_DB_PSLOG,
      ),
      TypeOrmModule.forFeature(
        [TGsRecordIndex, MailLog],
        {project}Configs.config().AMI,
      ),
    ],
  },
  PROJECT_TYPE.{project},
  CORE_TYPE....,
)
export class {project}SyncDataRepository {
  constructor(
    @InjectRepository(DailyEmpShareLog, {project}Configs.config().{project}_DB_EMP)
    private readonly dailyEmpShareLogRepo: Repository<DailyEmpShareLog>,
    @InjectRepository(EmpShare, {project}Configs.config().{project}_DB_EMP)
    private readonly empShareRepo: Repository<EmpShare>,
    @InjectRepository(AcDELLog, {project}Configs.config().{project}_DB_AC_TS)
    private readonly acDELLogRepo: Repository<AcDELLog>,
    @InjectRepository(TsSsoAcInfo, {project}Configs.config().{project}_DB_AC_TS)
    private readonly tsSsoACInfoRepo: Repository<TsSsoAcInfo>,
    @InjectRepository(
      SsoAPLoginLog,
      {project}Configs.config().{project}_DB_SSO_AP_LOG,
    )
    private readonly ssoAPLoginLogRepo: Repository<SsoAPLoginLog>,
    @InjectRepository(
      SsoAPLogControl,
      {project}Configs.config().{project}_DB_SSO_AP_LOG,
    )
    private readonly ssoAPLogControlRepo: Repository<SsoAPLogControl>,
    @InjectRepository(PSControl, {project}Configs.config().{project}_DB_PSLOG)
    private readonly psControlRepo: Repository<PSControl>,
    @InjectRepository(PSLogData, {project}Configs.config().{project}_DB_PSLOG)
    private readonly psLogDataRepo: Repository<PSLogData>,
    @InjectRepository(TGsRecordIndex, {project}Configs.config().AMI)
    private readonly tGsRecordIndexRepo: Repository<TGsRecordIndex>,
    @InjectRepository(MailLog, {project}Configs.config().AMI)
    private readonly mailLogRepo: Repository<MailLog>,
  ) {}
...
```