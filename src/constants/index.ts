export enum ResultEnum {
    SUCCESS = 0,
    LOGIN_FAILED = 10001
}

export enum LOCAL_STORE_KEY {
    "TOKEN_INFO" = "AUTH_TOKEN_INFO",
}


export const menuList:Menu.MenuOptions[] = [
    {
        path: '/login',
        title: '管理A',
    },
    {
        path: '/home',
        title: '管理B',
        children: [
            {
                path: '/home/index',
                title: '管理B-1'
            }
        ]
    },
    {
        path: '/detail',
        title: '管理C',
    },
]