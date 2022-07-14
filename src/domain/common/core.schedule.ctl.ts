export interface ScheduleServiceInterface extends Object {
  /**
   * 服務啟用即時執行
   */
  run(): Promise<void>;
  /**
   * 服務設定執行排程
   */
  schedule(): Promise<void>;
}
