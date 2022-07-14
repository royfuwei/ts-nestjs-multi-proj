import { Type } from '@nestjs/common';
import { INFRA_METADATA, INFRA_REGISTER } from 'src/constants';
import { IunCoreMetadata } from 'src/domain/common/infra.decorator';

/**
 * core.module 裝飾器: 目前作用為註冊core.controllers, core.services, core.usecase, core.repository，觸發decorator
 * @param metadata
 * @returns
 */
export function InfraCoreRegister(metadata: IunCoreMetadata): ClassDecorator {
  const propsKeys = Object.keys(metadata);
  validateModuleKeys(propsKeys);
  return (target: any) => {
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        let results: any[] = (metadata as any)[property];
        const metadataKey = `${INFRA_REGISTER}:${property}`;
        const services: Type<any>[] =
          Reflect.getMetadata(metadataKey, INFRA_METADATA) || [];
        results = results.concat(services);
        Reflect.defineMetadata(metadataKey, results, INFRA_METADATA);
      }
    }
  };
}

const metadataKeys = [INFRA_METADATA.CONTROLLERS, INFRA_METADATA.SERVICES];

const INVALID_INFRA_SERVICE_CONFIG_MESSAGE = (
  text: TemplateStringsArray,
  property: string,
) =>
  `Invalid property '${property}' passed into the @InfraCoreRegister() decorator.`;

export function validateModuleKeys(keys: string[]) {
  const validateKey = (key: string) => {
    if (metadataKeys.includes(key)) {
      return;
    }
    throw new Error(INVALID_INFRA_SERVICE_CONFIG_MESSAGE`${key}`);
  };
  keys.forEach(validateKey);
}
