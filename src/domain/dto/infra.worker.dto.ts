export class InfraWorkerInfoDTO {
  isMainThread: boolean;
  workers: string[];

  toString(): string {
    return `[InfraWorker info] isMainThread: ${
      this.isMainThread
    }, worker count: ${
      this.workers.length
    }, run workers: [${this.workers.toString()}]`;
  }
}
