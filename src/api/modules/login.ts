import { Login } from "../interface";

import http from '@/api'

export const loginApi = (params: Login.ReqParams) => {
    return http.post<Login.LoginRes>('/login', params)
}