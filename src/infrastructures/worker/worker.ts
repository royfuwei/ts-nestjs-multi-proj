import { Logger } from '@nestjs/common';
import * as path from 'path';
import {
  InfraThreadService,
  InfraWorkerService,
} from 'src/domain/common/infra.worker';
import { InfraWorkerInfoDTO } from 'src/domain/dto/infra.worker.dto';
import { isMainThread, Worker, workerData } from 'worker_threads';

export class InfraWorker implements InfraWorkerService {
  workers: Worker[] = [];
  workersMap: Map<string, Worker> = new Map();

  private readonly logger = new Logger(InfraWorker.name);

  public async runMainWorker(...services: InfraThreadService[]) {
    if (isMainThread) {
      for (const service of services) {
        const taskKey = `${service.constructor.name}`;
        this.logger.log(`[runMainWorker] run: ${taskKey}`);
        await service.run();
      }
    }
  }

  public async registerWorker(...services: InfraThreadService[]) {
    if (isMainThread) {
      this.logger.log(`[registerWorker] count: ${services.length}`);
      for (const item in services) {
        const service = services[item];
        const taskKey = `${service.constructor.name}-${item}`;
        this.logger.log(`[registerWorker] run: ${taskKey}`);
        const worker = new Worker(path.resolve('dist/main.js'), {
          workerData: taskKey,
        });
        this.workers = this.workers.concat(worker);
        this.workersMap.set(taskKey, worker);
        this.logger.log(`[registerWorker] register worker: ${taskKey} success`);
      }
    }
  }

  public async runWorker(...services: InfraThreadService[]) {
    if (!isMainThread) {
      for (const key in services) {
        const service = services[key];
        const taskKey = `${service.constructor.name}-${key}`;
        if (workerData == taskKey) {
          await service.run();
          this.logger.log(`[runWorker] run worker: ${taskKey} success`);
        }
      }
    }
  }

  public info(): InfraWorkerInfoDTO {
    const result = new InfraWorkerInfoDTO();
    result.isMainThread = isMainThread;
    result.workers = Array.from(this.workersMap.keys());
    return result;
  }

  public async terminateAll() {
    for (const worker of this.workers) {
      await worker.terminate();
    }
  }
}
