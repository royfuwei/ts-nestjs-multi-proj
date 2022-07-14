import { ConnectionOptions, getConnection } from 'typeorm';
import { InitConfigs } from 'src/configs/init';
import { BaseProjectORM, ProjectORMService } from 'src/domain/common/infra.orm';
import { join } from 'path';

export class ProjectORM extends BaseProjectORM implements ProjectORMService {
  public readonly connectionOptionsList: ConnectionOptions[];
  public readonly connectionOptionsMap: Map<string, ConnectionOptions> =
    new Map();

  constructor(
    protected projectType: string = InitConfigs.PROJECT_TYPE,
    protected ormConfigsPath: string = InitConfigs.PROJECT_INIT_ORM_CONFIG_PATH,
  ) {
    super();
    this.init();
    this.createConnections();
  }

  protected getEntities(connectName?: string): string {
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
  protected getMigrations(connectName?: string): string {
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
  protected getSubscribers(connectName?: string): string {
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

  async getConnection(connectName: string) {
    return getConnection(connectName);
  }
}
