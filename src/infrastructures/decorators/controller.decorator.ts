import { Provider } from '@nestjs/common';
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import {
  getInfraCoreCtlProvideKey,
  setInfraCoreControllers,
  setInfraCoreProviders,
} from './tools';

/**
 * core.controller 的裝飾器: 配置project 的 controller
 * @param projectType 設定的project type
 * @param coreType core type
 * @returns
 */
export function InfraCoreControllers(
  projectType: PROJECT_TYPE,
  coreType: CORE_TYPE,
): ClassDecorator {
  return (target: any) => {
    const provideKey = getInfraCoreCtlProvideKey(projectType, coreType);
    const provider: Provider = {
      provide: provideKey,
      useClass: target,
    };
    setInfraCoreProviders(projectType, coreType, provider);
    setInfraCoreControllers(projectType, coreType, target);
  };
}
