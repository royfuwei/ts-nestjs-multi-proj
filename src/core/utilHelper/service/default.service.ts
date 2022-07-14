import { Logger } from '@nestjs/common';
import { InitConfigs } from 'src/configs/init';
import { PROJECT_TYPE, CORE_TYPE } from 'src/constants';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';

@InfraCoreProviders({}, PROJECT_TYPE.COMMON, CORE_TYPE.UTIL_HELPER)
export class UtilHelperService {
  setLogger(logger: Logger) {
    this.logger = logger;
  }
  logger = new Logger(UtilHelperService.name);

  /**
   * retry generic function
   * @param job promise job
   * @param thisRetryPeriod milliseconds
   * @param maxRetryTimes max retry count
   * @param thisRetryTimes retry count
   * @example
   * const job = async () => { ... };
   * const result = await utilHelper.retry<Result>(job, this.retryPeriod, this.retryTimes);
   */
  async retry<T>(
    job: () => Promise<T>,
    thisRetryPeriod: number = InitConfigs.RETRY_PERIOD,
    maxRetryTimes: number = InitConfigs.RETRY_TIMES,
    thisRetryTimes = 1,
  ): Promise<T> {
    try {
      return await job();
    } catch (e) {
      if (thisRetryTimes == maxRetryTimes) {
        this.logger.error(e);
        throw e;
      } else {
        await this.sleep(thisRetryPeriod);
        this.logger.error(
          `[retry] error: ${e}, retryTimes: ${thisRetryTimes}..., retryPeriod: ${thisRetryPeriod}ms`,
        );
        return this.retry(
          job,
          thisRetryPeriod,
          maxRetryTimes,
          thisRetryTimes + 1,
        );
      }
    }
  }

  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
