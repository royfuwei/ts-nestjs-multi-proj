import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';
import { AuthService } from '../service/default.service';

@InfraCoreProviders({}, PROJECT_TYPE.COMMON, CORE_TYPE.AUTH)
export class AuthUseCase {
  constructor(private readonly authService: AuthService) {}
}
