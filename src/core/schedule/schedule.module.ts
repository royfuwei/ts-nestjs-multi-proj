import { Module } from '@nestjs/common';
import { InitConfigs } from 'src/configs/init';
import { InfraCoreRegister } from 'src/infrastructures/decorators/core.decorator';
import { DefaultScheduleService } from './service/default.service';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import {
  getInfraCoreProviderImports,
  getInfraCoreControllers,
  getInfraCoreProviders,
} from 'src/infrastructures/decorators/tools';
import { ScheduleModule } from '@nestjs/schedule';
import { ScheduleController } from './controller/default.controller';
import { ScheduleUseCase } from './usecase/default.usecase';

@InfraCoreRegister({
  controllers: [ScheduleController],
  services: [ScheduleUseCase, DefaultScheduleService],
})
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ...getInfraCoreProviderImports(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviderImports(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  controllers: [
    ...getInfraCoreControllers(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreControllers(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  providers: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
  exports: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.SCHEDULE),
  ],
})
export class InfraScheduleModule {}
