import { InfraWorkerInfoDTO } from '../dto/infra.worker.dto';

export interface InfraWorkerService {
  /**
   * Main thread 運行服務，會判斷是否是在Main thread
   * @param services 各服務實作 InfraThreadService
   */
  runMainWorker(...services: InfraThreadService[]): Promise<void>;
  /**
   * 註冊 worker 運行服務，會判斷是否是在Main thread
   * @param services 各服務實作 InfraThreadService
   */
  registerWorker(...services: InfraThreadService[]): Promise<void>;
  /**
   * 運行註冊的 worker 運行服務，會判斷是否 不在Main thread
   * @param services 各服務實作 InfraThreadService
   */
  runWorker(...services: InfraThreadService[]): Promise<void>;
  /**
   * InfraWorker 資訊
   */
  info(): InfraWorkerInfoDTO;
  /**
   * 停止所有worker
   */
  terminateAll(): Promise<void>;
}

/**
 * 各服務使用InfraWorker interface
 */
export interface InfraThreadService {
  run(...args: any[]): Promise<void>;
}
