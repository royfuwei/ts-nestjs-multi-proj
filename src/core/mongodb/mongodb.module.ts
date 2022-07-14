import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Path from 'path';
import { InitConfigs } from 'src/configs/init';
import { MGO_DB_JOURNAL_NAME, MGO_DB_TMP_NAME } from 'src/constants';

const replaceDatabaseInUrl = (url: URL, databaseName: string): URL => {
  if (url.pathname === '') {
    const newUrl = new URL(url.toString());
    newUrl.pathname = databaseName;
    return newUrl;
  } else {
    const parsedPath = Path.parse(url.pathname);
    parsedPath.base = databaseName;
    const newPathname = Path.format(parsedPath);

    const newUrl = new URL(url.toString());
    newUrl.pathname = newPathname;

    return newUrl;
  }
};

@Module({
  imports: [
    /* MongooseModule.forRootAsync({
      connectionName: MGO_DB_TMP_NAME,
      useFactory: async (): Promise<MongooseModuleOptions> => {
        const url = replaceDatabaseInUrl(
          new URL(`mongodb://${InitConfigs.MONGO_ADDR}`),
          MGO_DB_TMP_NAME,
        );
        return {
          uri: url.toString(),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          serverSelectionTimeoutMS: 5000,
        };
      },
    }), */
  ],
})
export class MongodbModule {}
