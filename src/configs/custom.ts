import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as fs from 'fs';
import { InitConfigs } from './init';
import _ = require('lodash');

/**
 * 取得開發使用的客製化配置json檔案(initial/${PROJECT_INIT_CONFIG | PROJECT_INIT}/configs.json)。
 */
export class CustomConfigs {
  public static getCustomConfigs<T = any>(): T {
    try {
      const content = fs.readFileSync(
        InitConfigs.PROJECT_INIT_CUSTOM_CONFIG_PATH,
        'utf8',
      );
      return JSON.parse(content);
    } catch (err) {
      return undefined;
    }
  }
}
