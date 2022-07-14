import { NestExpressApplication } from '@nestjs/platform-express';

export interface InfraNestAppService {
  readonly app: NestExpressApplication;
  run(): Promise<void>;
}
