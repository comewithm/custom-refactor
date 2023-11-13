
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