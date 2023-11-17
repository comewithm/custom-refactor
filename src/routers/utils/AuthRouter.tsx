import { getLocalStorage } from "@/utils/storage"
import { isTokenExpired } from "@/utils/util"
import { Navigate, useLocation } from "react-router-dom"

import { rootRouter } from "../index"
import { findRouter } from "@/utils/router"

export const AuthRouter = (props: {children: JSX.Element}) => {
    const {token = '', tokenExpires = -1} = getLocalStorage()

    const {pathname} = useLocation()
    // 根据路径获取当前路由信息(是否有访问权限等)
    const route = findRouter(pathname, rootRouter)

    // 是否有 token 或者 过期
    if(!token || isTokenExpired(tokenExpires)) {
        return <Navigate to={'/login'} replace />
    }

    // TODO: 当前路由是否有访问权限

    return props.children
}