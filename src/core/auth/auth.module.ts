import { Module } from '@nestjs/common';
import { InitConfigs } from 'src/configs/init';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { InfraCoreRegister } from 'src/infrastructures/decorators/core.decorator';
import {
  getInfraCoreProviderImports,
  getInfraCoreControllers,
  getInfraCoreProviders,
} from 'src/infrastructures/decorators/tools';
import { AuthRepository } from './repository/default.repo';
import { AuthUseCase } from './usecase/default.usecase';
import { AuthService } from './service/default.service';

@InfraCoreRegister({
  controllers: [],
  services: [AuthRepository, AuthUseCase, AuthService],
})
@Module({
  imports: [
    ...getInfraCoreProviderImports(PROJECT_TYPE.COMMON, CORE_TYPE.AUTH),
    ...getInfraCoreProviderImports(InitConfigs.PROJECT_TYPE, CORE_TYPE.AUTH),
  ],
  controllers: [
    ...getInfraCoreControllers(InitConfigs.PROJECT_TYPE, CORE_TYPE.AUTH),
  ],
  providers: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.AUTH),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.AUTH),
  ],
  exports: [
    ...getInfraCoreProviders(PROJECT_TYPE.COMMON, CORE_TYPE.AUTH),
    ...getInfraCoreProviders(InitConfigs.PROJECT_TYPE, CORE_TYPE.AUTH),
  ],
})
export class AuthModule {}
