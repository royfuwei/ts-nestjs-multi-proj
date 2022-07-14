import _ = require('lodash');
import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';

@InfraCoreProviders({}, PROJECT_TYPE.COMMON, CORE_TYPE.AUTH)
export class AuthService {}
