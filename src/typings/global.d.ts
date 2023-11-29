
declare namespace Menu {
    interface MenuOptions {
        path: string
        title: string
        icon?: string
        isLink?: string
        close?: boolean
        children?: MenuOptions[]
    }
}

declare interface ViteEnv {
    VITE_API_URL: string
    VITE_DROP_CONSOLE:boolean
}

declare interface MenuInfo {
    key: string
}