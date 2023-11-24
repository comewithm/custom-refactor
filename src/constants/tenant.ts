

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
        value: TENANT_USER_TYPE.PERSON,
        label: '个人开发者'
    },
    {
        value: TENANT_USER_TYPE.ENTERPRISE,
        label: '企业用户'
    }
]

// 用户来源
export const TENANT_SOURCE = [
    {
        value: TENANT_PLATFORM_SOURCE.STAR_RIVER,
        label: '星河'
    },
    {
        value: TENANT_PLATFORM_SOURCE.INTELLIGENCE_SERVICE,
        label: '平台'
    },
    {
        value: TENANT_PLATFORM_SOURCE.MINI_PROGRAM,
        label: '小程序'
    },
]