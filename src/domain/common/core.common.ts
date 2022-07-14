import { join } from 'path';

/**
 * 連線內部服務共用func
 */
export abstract class BaseHttpSvcService {
  protected base: string;
  protected getUrlByPath(path: string, ...morePath: string[]): URL {
    const requestURL = new URL(this.base);
    requestURL.pathname = join(requestURL.pathname, path, ...morePath);
    return requestURL;
  }
}
