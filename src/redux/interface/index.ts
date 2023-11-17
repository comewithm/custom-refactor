import { Login } from "@/api/interface"
import { BreadcrumbItemProps } from "antd"
export type GlobalAssemblySize = 'middle' | 'large' | 'small'

export interface ThemeConfigProps {
    primary: string
    isDark: boolean
    weakOrGray: 'weak' | 'gray' | 'default'
}
export interface GlobalState {
    tokenInfo: Login.LoginRes['tokenEntity']
    userInfo: {[key in string]?: any;}
    assemblySize: GlobalAssemblySize
    language: 'zh' | 'en'
    themeConfig: ThemeConfigProps
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

export interface BreadcrumbState {
    breadcrumbList: {
        [key in string]: BreadcrumbItemProps['menu']
    }
}

export interface AuthState {
    authRouter: string[]
}