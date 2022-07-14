import { CORE_TYPE, PROJECT_TYPE } from 'src/constants';
import { UtilHelperModule } from 'src/core/utilHelper/utilHelper.module';
import { InfraCoreProviders } from 'src/infrastructures/decorators/provider.decorator';

@InfraCoreProviders(
    {
        imports: [ UtilHelperModule]
    },
    PROJECT_TYPE.DEFAULT,
    CORE_TYPE.SCHEDULE,
)
export class DefaultScheduleService {}
