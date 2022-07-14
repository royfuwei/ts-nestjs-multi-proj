import {
  DynamicModule,
  ForwardReference,
  Provider,
  Type,
} from '@nestjs/common';

/**
 * Iun Core provider decorator 使用的metadata 配置
 * 會根據project type, common 注入到對應的core.module
 */
export interface IunCoreProvidersMetadata {
  /**
   * Optional list of imported modules that export the providers which are
   * required in this module.
   */
  imports?: Array<
    Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference
  >;
  /**
   * Optional list of providers that will be instantiated by the Nest injector
   * and that may be shared at least across this module.
   */
  providers?: Provider[];
}

/**
 * Iun Core register decorator 使用的metadata 配置
 * 需要預先註冊core.controller, core.service, core.usecase, core.repository
 */
export interface IunCoreMetadata {
  /**
   * Infra Core 需要預先註冊，觸發infra core decorator
   * infra core.controller
   */
  controllers?: Type<any>[];

  /**
   * Infra Core 需要預先註冊，觸發infra core decorator
   * infra core.service, core.usecase, core.repository
   */
  services?: Type<any>[];
}
