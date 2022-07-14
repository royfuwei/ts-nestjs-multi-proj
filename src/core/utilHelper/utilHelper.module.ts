import { Module } from '@nestjs/common';
import { InitConfigs } from 'src/configs/init';
import { PROJECT_TYPE, CORE_TYPE } from 'src/constants';
import { InfraCoreRegister } from 'src/infrastructures/decorators/core.decorator';
import {
  getInfraCoreProviderImports,
  getInfraCoreControllers,
  getInfraCoreProviders,
} from 'src/infrastructures/decorators/tools';
import { UtilHelperService } from './service/default.service';

@InfraCoreRegister({
  controllers: [],
  services: [UtilHelperService],
})
@Module({
  imports: [
    ...getInfraCoreProviderImports(PROJECT_TYPE.COMMON, CORE_TYPE.UTIL_HELPER),
    ...getInfraCoreProviderImports(
      InitConfigs.PROJECT_TYPE,
      CORE_TYPE.UTIL_HELPER,
    ),
  ],
  controllers: [
    ...getInfraCoreControllers(InitConfigs.PROJECT_TYPE, CORE_TYPE.UTIL_HELPER),
  ],
  providers: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.UTIL_HELPER),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.UTIL_HELPER),
  ],
  exports: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.UTIL_HELPER),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.UTIL_HELPER),
  ],
})
export class UtilHelperModule {}
