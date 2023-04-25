ts-nestjs-multi-proj
===

## 環境變數配置

基礎`.env`由[src/configs/init.ts](src/configs/init.ts) 配置

```shell
src/
|-- configs 
|   `-- init.ts # 初始化配置 env
```

- `APP_ID`: 辨識服務的app id
- `MONGO_ADDR`: mongo addr
- `API_TIMEOUT`: api timeout, default: 600000
- `RETRY_PERIOD`: retry delay 時間, default: 1000ms
- `RETRY_TIMES`: retry 次數, default: 60
- `GLOBAL_BODY_LIMIT`: app json body limit,default: 10mb
- `LARGE_BODY_LIMIT`: app json body limit,default: 50mb
- `PORT`: 同步排程服務api port, default: 5007。
- `SCHEDULE_PORT`: 查看排程執行狀態port, default: 15007。
- `TZ`: Asia/Taipei
- `PROJECT_TYPE`: 專案類型: default
- `PROJECT_INIT_CONFIG`: 專案使用的config 資料夾，無此設定，使用`PROJECT_TYPE`

### node cron

```
 # ┌────────────── second (optional)
 # │ ┌──────────── minute
 # │ │ ┌────────── hour
 # │ │ │ ┌──────── day of month
 # │ │ │ │ ┌────── month
 # │ │ │ │ │ ┌──── day of week
 # │ │ │ │ │ │
 # │ │ │ │ │ │
 # * * * * * *
```

Cron Ranges
- Seconds: 0-59
- Minutes: 0-59
- Hours: 0-23
- Day of Month: 1-31
- Months: 0-11 (Jan-Dec)
- Day of Week: 0-6 (Sun-Sat)

### Installation

```bash
$ npm install
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev
$ npm run dev:debug

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Document
- [開發相關文件](./doc/development/README.md)
- [共用MongoDB 資料庫 collection 定義](./doc/mongo/README.md)