import { GetAppDTO } from '../../core/app/dto/core.app.dto';

export interface AppServiceInterface {
  getApp(): GetAppDTO;
  // getRepoData(): Promise<any>;
}
