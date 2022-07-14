import { Controller, Get, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { AppServiceInterface } from 'src/domain/common/core.app.svc';
import { InfraCoreControllers } from 'src/infrastructures/decorators/controller.decorator';
import { AppService } from '../service/default.service';

@ApiTags('default:app')
@Controller()
@InfraCoreControllers(PROJECT_TYPE.DEFAULT, CORE_TYPE.APP)
export class AppController {
  constructor(
    @Inject(AppService)
    private readonly appService: AppServiceInterface,
  ) {}

  @Get()
  getApp() {
    return this.appService.getApp();
  }
}
