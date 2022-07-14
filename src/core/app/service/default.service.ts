import { PROJECT_TYPE, CORE_TYPE, SERVICE_HEADER_UID } from 'src/constants';
import { AppServiceInterface } from 'src/domain/common/core.app.svc';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';

@InfraCoreProviders({}, PROJECT_TYPE.DEFAULT, CORE_TYPE.APP)
export class AppService implements AppServiceInterface {
  getApp() {
    return {
      app: SERVICE_HEADER_UID,
    };
  }
}
