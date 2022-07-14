import 'reflect-metadata';
import { SERVICE_HEADER_UID } from 'src/constants';
import { AppService } from './default.service';

class MockAppService extends AppService {}

describe('core service: AppService', () => {
  const service = new MockAppService();

  it('getApp', async () => {
    const result = service.getApp();
    expect(result).toEqual({
      app: SERVICE_HEADER_UID,
    });
  });
});
