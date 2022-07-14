import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronCommand, CronJob } from 'cron';
import { InitConfigs } from 'src/configs/init';
import { PROJECT_TYPE, CORE_TYPE } from 'src/constants';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';

@InfraCoreProviders(
  {
    imports: [],
    providers: [],
  },
  PROJECT_TYPE.COMMON,
  CORE_TYPE.SCHEDULE,
)
@Injectable()
export class ScheduleUseCase {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  private logger = new Logger(ScheduleUseCase.name);

  /**
   * 註冊排程設定
   * @param name
   * @param cronTime
   * @param onTick
   * @returns
   */
  addSchedule(
    name: string,
    cronTime: string | Date | moment.Moment,
    onTick: CronCommand,
  ): CronJob {
    this.logger.log('[addSchedule] start');
    const job = new CronJob(cronTime, onTick, null, true, InitConfigs.TZ);
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.log('[addSchedule] end');
    return job;
  }
}
