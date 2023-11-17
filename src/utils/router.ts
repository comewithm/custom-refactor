import { TRouteObject } from "@/routers/interface";

// 递归获取routerList的path
export const flattenRouterListPath = (routerList: Menu.MenuOptions[]):string[] => {
    return routerList.reduce((router, menu) => {
        const {path, children} = menu
        if (!!children?.length) {
            router.push(path, ...flattenRouterListPath(children));
        } else {
            router.push(path);
        }
        return router;
    }, [] as string[]); 
}

/**
 * 深度优先遍历
 * @param pathname 当前路径
 * @param routes 所有路由
 * @returns 获取对应的路由信息
 */
export const findRouter = (pathname:string, routes: TRouteObject[]) => {
    let result = {} as TRouteObject
    for(const routeItem of routes) {
        const {path, children} = routeItem
        if(path === pathname) {
            return routeItem
        }

        if(!!children?.length) {
            const res = findRouter(pathname, children)
            if(Object.keys(res).length) {
                result = res!
            }
        }
    }
    return result
}