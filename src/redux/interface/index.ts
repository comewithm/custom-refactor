import { Login } from "@/api/interface"

export interface GlobalState {
    tokenInfo: Login.LoginRes['tokenEntity']
    userInfo: {[key in string]?: any;} 
}

export interface LocalTokenInfo {
    token: string
    tokenExpires: number
    refreshToken: string
    refreshExpires?: number
}

export interface MenuState {
    isCollapsed: boolean
    menuList: Menu.MenuOptions[]
}