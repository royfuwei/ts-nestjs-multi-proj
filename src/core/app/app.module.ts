import { Module } from '@nestjs/common';
import { InitConfigs } from 'src/configs/init';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { InfraCoreRegister } from 'src/infrastructures/decorators/core.decorator';
import { AppService } from './service/default.service';
import { AppController } from './controller/default.controller';
import {
  getInfraCoreProviderImports,
  getInfraCoreControllers,
  getInfraCoreProviders,
} from 'src/infrastructures/decorators/tools';
@InfraCoreRegister({
  controllers: [AppController],
  services: [AppService],
})
@Module({
  imports: [
    ...getInfraCoreProviderImports(PROJECT_TYPE.COMMON, CORE_TYPE.APP),
    ...getInfraCoreProviderImports(InitConfigs.PROJECT_TYPE, CORE_TYPE.APP),
  ],
  controllers: [
    ...getInfraCoreControllers(InitConfigs.PROJECT_TYPE, CORE_TYPE.APP),
  ],
  providers: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.APP),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.APP),
  ],
  exports: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.APP),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.APP),
  ],
})
export class AppModule {}
