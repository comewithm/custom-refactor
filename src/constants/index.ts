export enum ResultEnum {
    SUCCESS = 0,
    LOGIN_FAILED = 10001
}


export const menuList:Menu.MenuOptions[] = [
    {
        path: '/tenant',
        title: '租户管理',
    },
    {
        path: '/product',
        title: '产品管理',
        children: [
            {
                path: '/product/robot',
                title: '复刻人'
            }
        ]
    },
    {
        path: '/terminal',
        title: '终端管理',
    },
]