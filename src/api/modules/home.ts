import { Tenant } from "../interface/home";

import http from '@/api'

enum HOME_URL {
    "TENANT_LIST" = '/intellect-saas-v4/v1/xhUser/search'
}

export const fetchTenantList = (params: Partial<Tenant.ReqParams>) => {
    return http.post<Tenant.ResList>(HOME_URL.TENANT_LIST, params, {isToken: true})
}