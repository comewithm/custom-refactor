

export enum TENANT_USER_TYPE {
    PERSON = 1,
    ENTERPRISE = 2
}

export enum TENANT_PLATFORM_SOURCE {
    STAR_RIVER = 1,
    INTELLIGENCE_SERVICE = 2,
    MINI_PROGRAM = 3
}

// 用户类型
export const TENANT_ACCOUNT_LABEL = [
    {
        TENANT_TYPE: TENANT_USER_TYPE.PERSON,
        TENANT_ACCOUNT: '个人开发者'
    },
    {
        TENANT_TYPE: TENANT_USER_TYPE.ENTERPRISE,
        TENANT_ACCOUNT: '企业开发者'
    }
]

// 用户来源
export const TENANT_SOURCE = [
    {
        SOURCE_TYPE: TENANT_PLATFORM_SOURCE.STAR_RIVER,
        PLATFORM: '星河'
    },
    {
        SOURCE_TYPE: TENANT_PLATFORM_SOURCE.INTELLIGENCE_SERVICE,
        PLATFORM: '平台'
    },
    {
        SOURCE_TYPE: TENANT_PLATFORM_SOURCE.MINI_PROGRAM,
        PLATFORM: '小程序'
    },
]