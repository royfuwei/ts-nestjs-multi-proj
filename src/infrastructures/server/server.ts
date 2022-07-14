import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { OpenAPIObject, DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';
import { InitConfigs } from 'src/configs/init';
import { SERVICE_HEADER_UID } from 'src/constants';
import { InfraNestAppService } from 'src/domain/common/infra.server';
import { InfraThreadService } from 'src/domain/common/infra.worker';
import { RootModule } from './di/RootModule';

export class InfraNestApp implements InfraNestAppService, InfraThreadService {
  app: NestExpressApplication;

  constructor(private port: number = InitConfigs.PORT) {}

  public async run(): Promise<void> {
    this.app = await NestFactory.create(RootModule);
    this.buildAPIDocumentation(this.app);
    this.app.use(json({ limit: InitConfigs.GLOBAL_BODY_LIMIT }));
    this.app.set('trust proxy', true);
    await this.app.listen(this.port);
    await this.log();
  }

  /**
   * 產生api swagger 文件
   * @param app NestExpressApplication
   */
  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = SERVICE_HEADER_UID;
    const description = `${SERVICE_HEADER_UID} API documentation`;
    const version = '0.0.1';

    const options = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .build();
    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('docs', app, document);
  }

  private async log(): Promise<void> {
    Logger.log(`App is running at http://localhost:${this.port}`);
    Logger.log('Press CTRL-C to stop');
  }
}
