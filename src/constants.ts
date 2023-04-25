/**
 * service 使用api 的header uid
 */
export const SERVICE_HEADER_UID = 'ts-nestjs-multi-proj';
/**
 * 內部開發使用的project type
 * 給 core decorator, service, controller 區分project type 使用
 * 如果有新的project，在這邊增加enum
 */
export enum PROJECT_TYPE {
  /**
   * 內部使用，共用的project type
   */
  COMMON = 'common',
  /**
   * default
   */
  DEFAULT = 'default',
}

/**
 *  core 的功能定義 enum
 * 給 core decorator, service, controller 區分project type 使用
 */
export enum CORE_TYPE {
  /**
   * app: app 初始內容
   */
  APP = 'app',
  /**
   * auth 相關模組
   */
  AUTH = 'auth',
  /**
   * schedule 排程相關模組
   */
  SCHEDULE = 'schedule',
  /**
   * sso 登入相關模組
   */
  SSO = 'sso',
  /**
   * 寄信模組
   */
  MAIL = 'mail',
  /**
   * util helper 模組
   */
  UTIL_HELPER = 'util-helper',
}

export const INFRA_CONTROLLER_METADATA = 'infra_core_controller';
export const INFRA_CONTROLLER_PROVIDER_METADATA =
  'infra_core_controller_provider';
export const INFRA_SERVICE_METADATA = 'infra_core_service';
export const INFRA_PROVIDER_METADATA = 'infra_core_provider';
export const INFRA_REGISTER = 'infra_register';

/**
 * 主要是給infra core decorator 使用的target object
 */
export const INFRA_METADATA = {
  IMPORTS: 'imports',
  PROVIDERS: 'providers',
  CONTROLLERS: 'controllers',
  EXPORTS: 'exports',
  SERVICES: 'services',
};

/**
 * 帳號預設有效期限
 */
export const ACCOUNT_EXPIRE_AT = new Date('2079-01-01T00:00:00+08:00');

/**
 * 帳號預設起始時間
 */
export const ACCOUNT_BEGIN_AT = new Date('1970-01-01T00:00:00+08:00');

/* -----mongodb----- */
/**
 * 內部mongodb auth
 */
export const MGO_DB_AUTH_NAME = 'auth';
/**
 * 內部mongodb journal
 */
export const MGO_DB_JOURNAL_NAME = 'journal';
/**
 * 內部mongodb tmp
 */
export const MGO_DB_TMP_NAME = 'tmp';

export const MGO_TMP_MODEL_USERS = 'users';
export const MGO_TMP_MODEL_EMPS = 'emps';
export const MGO_TMP_MODEL_PERMISSIONS = 'permissions';
export const MGO_TMP_MODEL_DAILY_PERMISSIONS = 'daily_permissions';
/**
 * journal collection: api_track
 */
export const MGO_JOURNAL_MODEL_API_TRACK = 'api_track';
/**
 * journal adapterlog
 */
export const MGO_JOURNAL_MODEL_ADAPTER_LOG = 'adapterlog';

/* --------auth svc url path------- */
export const AUTH_SVC_PATH_USERS_IMPORT = 'users/import';
export const AUTH_SVC_PATH_AUDIT_NODES = 'audit-nodes';
export const AUTH_SVC_PATH_AUTH_LOGIN = 'auth/login';
export const AUTH_SVC_PATH_AUTH_PRIVILEGE = 'auth/privilege';
export const AUTH_SVC_PATH_AUTH_SSO_EMP_ID = 'auth/sso/login/empId';
export const AUTH_SVC_PATH_ROLES = 'roles';
export const AUTH_SVC_PATH_USERS = 'users';

export const ROLE_PERMISSION_DEFAULT_CONSTRAINT_ACTION = 'DEFAULT';

/* --------common svc url path------- */
export const COMMON_SVC_PATH_CONFIG_MAIL_GROUPS = 'email/config/mail-groups';
export const COMMON_SVC_PATH_SEND_MAIL_GROUP = 'email/send/mail-groups';

/* ------- audit node ------- */
export const AUDIT_NODE_ROOT = 'Root';
