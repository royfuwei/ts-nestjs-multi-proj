import { Module } from '@nestjs/common';
import { AppModule } from 'src/core/app/app.module';
import { MongodbModule } from 'src/core/mongodb/mongodb.module';

@Module({
  imports: [MongodbModule, AppModule],
})
export class RootModule {}
