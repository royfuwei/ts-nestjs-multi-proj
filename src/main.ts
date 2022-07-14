import 'reflect-metadata';
import { InfraNestApp } from './infrastructures/server/server';
import { InfraWorker } from './infrastructures/worker/worker';
import { isMainThread } from 'worker_threads';
import { Logger } from '@nestjs/common';
import { InitConfigs } from './configs/init';
import { InfraThreadService } from './domain/common/infra.worker';
import { InfraSchedule } from './infrastructures/schedule/schedule';

async function main(): Promise<void> {
  const infraNestApp = new InfraNestApp();
  const infraSchedule = new InfraSchedule();
  const infraWorker = new InfraWorker();
  Logger.log(`-----------------------------------------`);
  Logger.log(
    `[Config] PROJECT_TYPE: ${InitConfigs.PROJECT_TYPE}, PROJECT_INIT_CONFIG: ${InitConfigs.PROJECT_INIT_CONFIG}`,
  );
  const mainServices: InfraThreadService[] = [infraNestApp];
  const workerServices: InfraThreadService[] = [infraSchedule];
  /**
   * 區分main thread, worker
   */
  try {
    if (isMainThread) {
      await infraWorker.runMainWorker(...mainServices);
      await infraWorker.registerWorker(...workerServices);
      Logger.log(infraWorker.info().toString());
    } else {
      await infraWorker.runWorker(...workerServices);
    }
  } catch (error) {
    console.error(error);
    process.kill(process.ppid, 'SIGTERM');
  }
}
main();
