import { InitConfigs } from 'src/configs/init';
import { InfraThreadService } from 'src/domain/common/infra.worker';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { RootModule } from './di/RootModule';
import { ScheduleServiceInterface } from 'src/domain/common/core.schedule.ctl';
import { Logger } from '@nestjs/common';
import { CORE_TYPE, SERVICE_HEADER_UID } from 'src/constants';
import {
  checkInfraCoreControllerProvider,
  getInfraCoreCtlProvideKey,
} from '../decorators/tools';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class InfraSchedule implements InfraThreadService {
  app: NestExpressApplication;

  constructor(private port: number = InitConfigs.SCHEDULE_PORT) {}

  private readonly logger = new Logger(InfraSchedule.name);

  async run() {
    this.app = await NestFactory.create(RootModule);
    await this.runScheduleController();
    this.buildAPIDocumentation(this.app);
    this.app.listen(this.port);
    this.log();
  }

  private async runScheduleController() {
    const hasScheduleController = checkInfraCoreControllerProvider(
      InitConfigs.PROJECT_TYPE,
      CORE_TYPE.SCHEDULE,
    );
    const scheduleCtlProvideKey = getInfraCoreCtlProvideKey(
      InitConfigs.PROJECT_TYPE,
      CORE_TYPE.SCHEDULE,
    );
    if (hasScheduleController) {
      const scheduleController: ScheduleServiceInterface = this.app.get(
        scheduleCtlProvideKey,
      );
      await scheduleController.run();
      await scheduleController.schedule();
    } else {
      this.logger.log(`hasScheduleController: ${hasScheduleController}`);
    }
  }

  /**
   * 產生api swagger 文件
   * @param app NestExpressApplication
   */
  private buildAPIDocumentation(app: NestExpressApplication): void {
    const title = `${SERVICE_HEADER_UID} schedule`;
    const description = `${SERVICE_HEADER_UID} schedule API documentation`;
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
