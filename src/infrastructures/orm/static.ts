import { ConnectionOptions, createConnection } from 'typeorm';
import { InitConfigs } from 'src/configs/init';
import { join } from 'path';
import * as fs from 'fs';
import { TlsOptions } from 'tls';
import * as _ from 'lodash';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicModule, Provider } from '@nestjs/common';

/**
 * 配合nest 靜態產生project orm configs
 */
export class InfraORM {
  static projectType: string = InitConfigs.PROJECT_TYPE;
  static ormConfigsPath: string = InitConfigs.PROJECT_INIT_ORM_CONFIG_PATH;

  /**
   * get nestjs typeorm modules
   * @returns DynamicModule[]
   */
  public static getImportModules(): DynamicModule[] {
    const ormConfigsMap: Map<string, ConnectionOptions> =
      this.getOrmConfigsMap();
    let ormModules: DynamicModule[] = [];
    for (const config of ormConfigsMap.values()) {
      const result = TypeOrmModule.forRoot(config);
      ormModules = ormModules.concat(result);
    }
    return ormModules;
  }

  /**
   * typeorm factory provider
   * @returns Provider[]
   */
  public static getDBProviders() {
    const ormConfigsMap: Map<string, ConnectionOptions> =
      this.getOrmConfigsMap();
    let providers: Provider[] = [];
    for (const [key, config] of ormConfigsMap.entries()) {
      const result: Provider = {
        provide: key,
        useFactory: async () => createConnection(config),
      };
      providers = providers.concat(result);
    }
    return providers;
  }

  public static getOrmConfigsMap() {
    const connectionOptionsMap: Map<string, ConnectionOptions> = new Map();
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
      connectionOptionsMap.set(name, newConfig);
    }
    return connectionOptionsMap;
  }

  static getEntities(connectName?: string): string {
    return join(
      __dirname,
      '../..',
      'domain/orm',
      'entity',
      this.projectType,
      connectName,
      '**/*{.ts,.js}',
    );
  }
  static getMigrations(connectName?: string): string {
    return join(
      __dirname,
      '../..',
      'domain/orm',
      'migrations',
      this.projectType,
      connectName,
      '**/*{.ts,.js}',
    );
  }
  static getSubscribers(connectName?: string): string {
    return join(
      __dirname,
      '../..',
      'domain/orm',
      'subscribers',
      this.projectType,
      connectName,
      '**/*{.ts,.js}',
    );
  }

  static getSSL(connectName?: string): any | boolean | TlsOptions {
    return false;
  }
}
