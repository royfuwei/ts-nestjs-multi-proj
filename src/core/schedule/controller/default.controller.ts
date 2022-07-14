import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ApiExtraModels, ApiOperation } from '@nestjs/swagger';
import { CronTime } from 'cron';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { ScheduleServiceInterface } from 'src/domain/common/core.schedule.ctl';
import { ApiPaginatedDTO, PaginatedDTO } from 'src/domain/dto/paginated.dto';
import { InfraCoreControllers } from 'src/infrastructures/decorators/controller.decorator';
import { CronJobStatusDTO, UpdateCronTimeBody } from '../dto/core.schedule.dto';

@InfraCoreControllers(PROJECT_TYPE.COMMON, CORE_TYPE.SCHEDULE)
@Controller('schedule')
@ApiExtraModels(PaginatedDTO, CronJobStatusDTO)
export class ScheduleController implements ScheduleServiceInterface {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private readonly logger = new Logger(ScheduleController.name);

  async run(): Promise<void> {
    return;
  }

  async schedule(): Promise<void> {
    return;
  }

  @ApiOperation({ summary: '取得排程狀態' })
  @ApiPaginatedDTO(CronJobStatusDTO)
  @Get()
  async getCronTasks(): Promise<PaginatedDTO<CronJobStatusDTO>> {
    const jobs = this.schedulerRegistry.getCronJobs();
    const dataList: CronJobStatusDTO[] = [];
    const result: PaginatedDTO<CronJobStatusDTO> = new PaginatedDTO;
    for (const [key, job] of jobs.entries()) {
      const data = {
        name: key,
        cron: job['cronTime']['source'],
        lastDate: job.lastDate(),
        nextDate: job.nextDate().toDate(),
        running: job.running,
      };
      dataList.push(data);
    }
    result.items = dataList;
    result.total = dataList.length;
    return result;
  }

  @ApiOperation({
    summary: '依據排程名稱，更新排程時間(暫時性的異動，服務重啟後依配置執行)',
  })
  @Post(':name')
  async updateTaskCronTimeByName(
    @Param('name') name: string,
    @Body() bodyData: UpdateCronTimeBody,
  ): Promise<CronJobStatusDTO> {
    const exist = this.schedulerRegistry.doesExists('cron', name);
    if (!exist) throw new NotFoundException();
    const job = this.schedulerRegistry.getCronJob(name);
    const cronTime = new CronTime(bodyData.cron);
    job.setTime(cronTime);
    job.start();
    return {
      name,
      cron: job['cronTime']['source'],
      lastDate: job.lastDate(),
      nextDate: job.nextDate().toDate(),
      running: job.running,
    };
  }
}
