import { Login } from "@/pages/Login";
import { Navigate, useRoutes } from "react-router-dom";
import { TRouteObject } from "./interface";


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
    {
        path: '*',
        element: <Navigate to={"/404"} />
    }
]

const Router = () => {
    return useRoutes(rootRouter)
}

export default Router