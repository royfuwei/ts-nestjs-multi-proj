import { Module } from '@nestjs/common';
import { MongodbModule } from 'src/core/mongodb/mongodb.module';
import { InfraScheduleModule } from 'src/core/schedule/schedule.module';
@Module({
  imports: [MongodbModule, InfraScheduleModule],
})
export class RootModule {}
