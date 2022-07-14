import { CORE_TYPE, INFRA_METADATA, PROJECT_TYPE } from 'src/constants';
import { IunCoreProvidersMetadata } from 'src/domain/common/infra.decorator';
import { setInfraCoreProviderImports, setInfraCoreProviders } from './tools';

/**
 * core.service 裝飾器: 配置project 需求的 provider
 * @param metadata
 * @param projectType
 * @param coreType
 * @returns
 */
export function InfraCoreProviders(
  metadata: IunCoreProvidersMetadata,
  projectType: PROJECT_TYPE,
  coreType: CORE_TYPE,
): ClassDecorator {
  const propsKeys = Object.keys(metadata);
  validateModuleKeys(propsKeys);

  return (target: any) => {
    setInfraCoreProviders(projectType, coreType, target);
    for (const property in metadata) {
      if (metadata.hasOwnProperty(property)) {
        const results: any[] = (metadata as any)[property];
        if (property == INFRA_METADATA.PROVIDERS) {
          setInfraCoreProviders(projectType, coreType, ...results);
        }
        if (property == INFRA_METADATA.IMPORTS) {
          setInfraCoreProviderImports(projectType, coreType, ...results);
        }
      }
    }
  };
}

const metadataKeys = [INFRA_METADATA.PROVIDERS, INFRA_METADATA.IMPORTS];

const INVALID_INFRA_SERVICE_CONFIG_MESSAGE = (
  text: TemplateStringsArray,
  property: string,
) =>
  `Invalid property '${property}' passed into the @InfraService() decorator.`;

export function validateModuleKeys(keys: string[]) {
  const validateKey = (key: string) => {
    if (metadataKeys.includes(key)) {
      return;
    }
    throw new Error(INVALID_INFRA_SERVICE_CONFIG_MESSAGE`${key}`);
  };
  keys.forEach(validateKey);
}
