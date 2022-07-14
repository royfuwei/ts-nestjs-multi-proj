import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as env from 'env-var';
import { join } from 'path';

/**
 * 系統預設啟用的設定檔
 */
export class InitConfigs {
  /**
   * app json body limit
   * global
   */
  public static GLOBAL_BODY_LIMIT: string = env
    .get('GLOBAL_BODY_LIMIT')
    .required()
    .default('10mb')
    .asString();
  /**
   * app json body limit
   * large
   */
  public static LARGE_BODY_LIMIT: string = env
    .get('LARGE_BODY_LIMIT')
    .required()
    .default('50mb')
    .asString();
  /**
   * app id
   * 供客戶端使用
   */
  public static APP_ID: string = env
    .get('APP_ID')
    .required()
    .default('appid')
    .asString();
  /**
   * initial 資料夾位置
   */
  public static INITIAL_PATH = 'initial';

  /**
   * 內部mongodb 位置
   */
  public static MONGO_ADDR: string = env
    .get('MONGO_ADDR')
    .required()
    .asString();

  /**
   * 專案名稱
   */
  public static PROJECT_TYPE: string = env
    .get('PROJECT_TYPE')
    .required()
    .default('default')
    .asString();

  /**
   * 專案初始化config 資料夾，預設使用PROJECT_TYPE
   */
  public static PROJECT_INIT_CONFIG: string = env
    .get('PROJECT_INIT_CONFIG')
    .default(this.PROJECT_TYPE)
    .asString()
    ? env.get('PROJECT_INIT_CONFIG').default(this.PROJECT_TYPE).asString()
    : this.PROJECT_TYPE;

  /**
   * 專案typeorm config 檔案位置
   */
  public static PROJECT_INIT_ORM_CONFIG_PATH = join(
    this.INITIAL_PATH,
    this.PROJECT_INIT_CONFIG,
    'ormconfigs.json',
  );

  /**
   * 專案custom config 檔案位置
   */
  public static PROJECT_INIT_CUSTOM_CONFIG_PATH = join(
    this.INITIAL_PATH,
    this.PROJECT_INIT_CONFIG,
    'configs.json',
  );

  /**
   * api timeout
   */
  public static API_TIMEOUT: number = env
    .get('API_TIMEOUT')
    .required()
    .default(600000)
    .asInt();

  /**
   * retry delay 時間
   */
  public static RETRY_PERIOD: number = env
    .get('RETRY_PERIOD')
    .required()
    .default(1000)
    .asInt();

  /**
   * retry 次數
   */
  public static RETRY_TIMES: number = env
    .get('RETRY_TIMES')
    .required()
    .default(60)
    .asInt();

  /**
   *  時區設定
   */
  public static TZ: string = env
    .get('TZ')
    .required()
    .default('Asia/Taipei')
    .asString();

  /**
   * 服務啟用對外port
   */
  public static PORT: number = env
    .get('PORT')
    .required()
    .default(5007)
    .asPortNumber();

  /**
   * schedule 服務啟用對外port
   */
  public static SCHEDULE_PORT: number = env
    .get('SCHEDULE_PORT')
    .required()
    .default(15007)
    .asPortNumber();
}
