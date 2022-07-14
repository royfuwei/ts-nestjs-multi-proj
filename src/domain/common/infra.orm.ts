import * as _ from 'lodash';
import * as fs from 'fs';
import { TlsOptions } from 'tls';
import {
  Connection,
  ConnectionOptions,
  createConnection,
  createConnections,
} from 'typeorm';

export interface ProjectORMService extends BaseProjectORMService {
  /**
   * 當db 連線斷線時，可以使用此再次連線
   * @param name connect name
   */
  createConnection(name: string): Promise<Connection>;
  /**
   * 取得db 連線
   * @param name connect name
   */
  getConnection(name: string): Promise<Connection>;
}

export interface BaseProjectORMService {
  readonly connectionOptionsList: ConnectionOptions[];
  readonly connectionOptionsMap: Map<string, ConnectionOptions>;
  getOrmConfigs(): ConnectionOptions[];
  init(): void;
}

export abstract class BaseProjectORM implements BaseProjectORMService {
  protected abstract projectType: string;
  protected abstract ormConfigsPath: string;
  public connectionOptionsList: ConnectionOptions[];
  public connectionOptionsMap: Map<string, ConnectionOptions>;

  public init(): void {
    this.genOrmConfigsMap();
    this.connectionOptionsList = this.getOrmConfigs();
  }

  public getOrmConfigs(): ConnectionOptions[] {
    return Array.from(this.connectionOptionsMap.values());
  }

  public createConnection(name: string) {
    return createConnection(name);
  }

  protected createConnections() {
    return createConnections(this.connectionOptionsList);
  }

  protected abstract getEntities(connectName?: string): string;
  protected abstract getMigrations(connectName?: string): string;
  protected abstract getSubscribers(connectName?: string): string;
  protected getSSL(connectName?: string): any | boolean | TlsOptions {
    return false;
  }

  /**
   * 取得project initial ormconfigs.json 配置檔
   * 1.產生db name 對應的entity 位置。
   * 2.建立connection map
   * @returns
   */
  protected genOrmConfigsMap(): void {
    const ormConfigsContent = fs.readFileSync(this.ormConfigsPath, 'utf8');
    const ormConfigs: ConnectionOptions[] = JSON.parse(ormConfigsContent);
    for (const config of ormConfigs) {
      const name = config.name;
      const newConfig: ConnectionOptions | any = Object.assign({}, config, {
        entities: [this.getEntities(name)],
        migrations: [this.getMigrations(name)],
        subscribers: [this.getSubscribers(name)],
      });
      if (!_.has(newConfig.options, 'ssl')) {
        newConfig.options.ssl = this.getSSL();
      }
      this.connectionOptionsMap.set(name, newConfig);
    }
  }
}
