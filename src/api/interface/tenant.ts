import { ReqPage, ResPage } from "./index";


export namespace Tenant {
    export interface ReqParams extends ReqPage {
        /**
         * 用户类型 1-个人 2-企业
         */
        accountType?: number;
        /**
         * 创建时间
         */
        endTime?: string;
        /**
         * 租户名
         */
        name?: string;
        /**
         * 备注
         */
        notes?: string;
        /**
         * 全局搜索字段
         */
        searchName?: string;
        /**
         * 来源 1-星河 2-智能服务平台 3-小程序
         */
        source?: number;
        /**
         * 创建时间
         */
        startTime?: string;
        /**
         * 租户id
         */
        tenantId?: string;
        /**
         * 用户手机号码
         */
        userMobile?: string;
        [property: string]: any;
    }

    export type ResList = ResPage<TenantInfo[]>
}


export interface TenantInfo {
    /**
     * 账号启用/禁用状态（0，未禁用；1，已禁用）
     */
    accountStatus?: number;
    /**
     * 用户类型 1-个人 2-企业
     */
    accountType?: number;
    /**
     * 业务类型
     */
    businessType?: string;
    /**
     * 联系人
     */
    contacts?: string;
    /**
     * 创建人
     */
    createBy?: string;
    /**
     * 创建时间
     */
    createTime?: Date;
    /**
     * 创建人用户id
     */
    createUserId?: number;
    /**
     * 账号正常/删除状态（0，正常；1，删除）*
     */
    deleteStatus?: number;
    /**
     * 邮箱
     */
    email?: string;
    /**
     * 企业名称
     */
    enterpriseName?: string;
    /**
     * 主键
     */
    id?: number;
    /**
     * 是否可以删除（默认的账号不能删除）
     */
    isDelete?: number;
    /**
     * 是否为超级管理员0：超管，1：非超管
     */
    isSuperAdmin?: number;
    /**
     * 备注
     */
    notes?: string;
    /**
     * 用户名称
     */
    personName?: string;
    /**
     * 计次发送短信标记 1-没有发送过 2-余次不足发送 3-次数为0发送
     */
    smsFlag?: number;
    /**
     * 声音标识
     */
    sound?: string;
    /**
     * 来源 1-星河 2-智能服务平台 3-小程序
     */
    source?: number;
    /**
     * 系统id*（1：星河项目，2：智能服务平台）
     */
    systemId?: number;
    /**
     * 租户id
     */
    tenantId?: string;
    /**
     * 更新人
     */
    updateBy?: string;
    /**
     * 更新时间
     */
    updateTime?: Date;
    /**
     * 修改人用户id
     */
    updateUserId?: number;
    /**
     * 用户编码
     */
    userCode?: string;
    /**
     * 用户手机号码
     */
    userMobile?: string;
    /**
     * 登录账号
     */
    userName?: string;
    /**
     * 用户密码
     */
    userPwd?: string;
    [property: string]: any;
}


export interface TenantSearch {
    tenantIdSearch?: string
    tenantNameSearch?: string
    userMobileSearch?: string
    accountTypeSearch?: number
    createTimeSearch?: string
    sourceSearch?: number
    notesSearch?: string
}

type SetSameKeyValues<T> = {
    [K in keyof T]: K
}

export const TENANT_PROPS: SetSameKeyValues<TenantInfo> = {
    'tenantId': 'tenantId',
    'accountType': 'accountType',
    'source': 'source',
    'userMobile': 'userMobile',
    'createTime': 'createTime',
    'updateTime': 'updateTime',
    'notes': 'notes'
}

export const TENANT_SEARCH_IDS: SetSameKeyValues<TenantSearch> = {
    'accountTypeSearch': 'accountTypeSearch',
    'createTimeSearch': 'createTimeSearch',
    'notesSearch': 'notesSearch',
    'sourceSearch': 'sourceSearch',
    'tenantIdSearch': 'tenantIdSearch',
    'tenantNameSearch': 'tenantNameSearch',
    'userMobileSearch': 'userMobileSearch'
}