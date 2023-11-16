import { Login } from "@/pages/login";
import { Navigate, useRoutes } from "react-router-dom";
import { TRouteObject } from "./interface";

// 导入所有路由
const metaRouters = import.meta.glob('./modules/*.tsx', {eager: true})

const routerList:TRouteObject[] = []

Object.values(metaRouters).forEach((item:any) => {
    routerList.push(...item.default)
})

export const rootRouter:TRouteObject[] = [
    {
        path: "/",
        element: <Navigate to={"/login"} />
    },
    {
        path: "/login",
        element: <Login />,
        meta: {
            requiresAuth: false,
            title: '登录页',
            key: 'login'
        }
    },
    // 添加所有路由
    ...routerList,
    {
        path: '*',
        element: <Navigate to={"/404"} />
    }
]

const Router = () => {
    return useRoutes(rootRouter)
}

export default Router