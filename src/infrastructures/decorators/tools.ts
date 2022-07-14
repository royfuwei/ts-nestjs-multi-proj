import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';
import {
  PROJECT_TYPE,
  CORE_TYPE,
  INFRA_METADATA,
  INFRA_CONTROLLER_METADATA,
  INFRA_PROVIDER_METADATA,
} from 'src/constants';

/* InfraCore common */

/**
 * 傳入metadataKey 取得metadata
 * @param infraMetadataKey input metadataKey
 * @param target
 * @returns
 */
export function getInfraCoreMetadata<T>(
  infraMetadataKey: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
) {
  return <T[]>Reflect.getMetadata(infraMetadataKey, target) || [];
}

/* InfraCore provider */

/**
 * 設定InfraCore service, usecase, repository 要使用的service
 * @param projectType
 * @param coreType
 * @param providers
 */
export function setInfraCoreProviders(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
  ...providers: Provider[]
) {
  const metadataKey = `${projectType}:${coreType}:${INFRA_PROVIDER_METADATA}:${INFRA_METADATA.PROVIDERS}`;
  let results: Provider[] = getInfraCoreProviders(projectType, coreType);
  results = results.concat(providers);
  Reflect.defineMetadata(metadataKey, results, INFRA_METADATA);
}

/**
 * 取得InfraCore service, usecase, repository 要使用的service
 * @param projectType
 * @param coreType
 * @param providers
 */
export function getInfraCoreProviders(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
): Provider[] {
  const metadataKey = `${projectType}:${coreType}:${INFRA_PROVIDER_METADATA}:${INFRA_METADATA.PROVIDERS}`;
  return getInfraCoreMetadata(metadataKey, INFRA_METADATA);
}

/**
 * 設定InfraCore service, usecase, repository 要使用的service 的module
 * @param projectType
 * @param coreType
 * @param providers
 */
export function setInfraCoreProviderImports(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
  ...providers: any[]
) {
  const metadataKey = `${projectType}:${coreType}:${INFRA_PROVIDER_METADATA}:${INFRA_METADATA.IMPORTS}`;
  let results: any[] = getInfraCoreProviderImports(projectType, coreType);
  results = results.concat(providers);
  Reflect.defineMetadata(metadataKey, results, INFRA_METADATA);
}

/**
 * 取得InfraCore service, usecase, repository 要使用的service 的module
 * @param projectType
 * @param coreType
 * @param providers
 */
export function getInfraCoreProviderImports(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
): Array<
  Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
> {
  const metadataKey = `${projectType}:${coreType}:${INFRA_PROVIDER_METADATA}:${INFRA_METADATA.IMPORTS}`;
  return getInfraCoreMetadata(metadataKey, INFRA_METADATA);
}

/**
 * controller 作為被註冊的provider key
 * @param projectType
 * @param coreType
 * @returns
 */
export function getInfraCoreCtlProvideKey(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
) {
  return `${projectType}:${coreType}:${INFRA_CONTROLLER_METADATA}`;
}

/**
 * 確認controller 作為被註冊的provider key，是否有controller
 * @param projectType
 * @param coreType
 * @returns
 */
export function checkInfraCoreControllerProvider(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
) {
  const provideKey = getInfraCoreCtlProvideKey(projectType, coreType);
  return Reflect.hasMetadata(provideKey, INFRA_METADATA);
}

/* InfraCore controller */

/**
 * 設定裝飾器的project core.controller
 * @param projectType
 * @param coreType
 * @param controllers
 */
export function setInfraCoreControllers(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
  ...controllers: Type<any>[]
) {
  const metadataKey = `${projectType}:${coreType}:${INFRA_CONTROLLER_METADATA}`;
  let results: Type<any>[] = getInfraCoreControllers(projectType, coreType);
  results = results.concat(controllers);
  Reflect.defineMetadata(metadataKey, results, INFRA_METADATA);
}

/**
 * 取得裝飾器的project core.controller
 * @param projectType 設定的project type
 * @param coreType core type
 * @returns
 */
export function getInfraCoreControllers(
  projectType: PROJECT_TYPE | string,
  coreType: CORE_TYPE,
): Type<any>[] {
  const metadataKey = `${projectType}:${coreType}:${INFRA_CONTROLLER_METADATA}`;
  return getInfraCoreMetadata(metadataKey, INFRA_METADATA);
}
