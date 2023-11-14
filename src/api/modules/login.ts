import { ApiResponse, Login } from "../interface";

import http from '@/api'

enum LoginUrl {
    "PUBLIC_KEY" = '/intellect-saas-v4/v1/xhAdmin/getPublicKey',
    "LOGIN_IN" = '/intellect-saas-v4/v1/xhAdmin/login',
    "LOGIN_OUT" = '/intellect-saas-v4/v1/admin/logout',
    "REFRESH_TOKEN" = '/auth-service/v1/refreshPlatformToken'
}

export const fetchPublicKey = () => {
    return http.get<Login.ReqParams['publicKey']>(LoginUrl.PUBLIC_KEY, {}, {isToken: false})
}

export const fetchLoginIn = (params: Login.ReqParams) => {
    return http.post<Login.LoginRes>(LoginUrl.LOGIN_IN, params, {isToken: false})
}

export const fetchLoginOut = () => {
    return http.post<ApiResponse<any>>(LoginUrl.LOGIN_OUT)
}

export const fetchRefreshToken = (params:{refreshToken:string}) => {
    return http.post<Login.LoginRes['tokenEntity']>(LoginUrl.REFRESH_TOKEN, params, {isToken: false})
}