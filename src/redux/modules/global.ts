import { Login } from "@/api/interface";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import { GlobalAssemblySize, GlobalState, ThemeConfigProps } from "../interface";
import { getLocalStorage } from "@/utils/storage";

const tokenInfo = getLocalStorage()

const globalState: GlobalState = {
    tokenInfo: {
        tokenId: '',
        authorizationToken: tokenInfo.token,
        refreshToken: tokenInfo.refreshToken,
        refreshExpiresIn: tokenInfo.refreshExpires,
        expiresIn: tokenInfo.tokenExpires
    },
    userInfo: {},
    assemblySize: 'middle',
    language: 'zh',
    themeConfig: {
        primary: '#1890ff',
        isDark: false,
        weakOrGray: 'default'
    }
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalState,
    reducers: {
        setToken(state:GlobalState, {payload}: PayloadAction<Login.LoginRes['tokenEntity']>) {
            state.tokenInfo = {
                ...payload
            }
        },
        setUserInfo(state:GlobalState, {payload}: PayloadAction<Login.LoginRes['currentLoginUser']>) {
            state.userInfo = {
                ...state.userInfo,
                ...payload
            }
        },
        setAssemblySize(state:GlobalState, {payload}: PayloadAction<GlobalAssemblySize>) {
            state.assemblySize = payload
        },
        setLanguage(state:GlobalState, {payload}: PayloadAction<GlobalState['language']>) {
            state.language = payload
        },
        setThemeConfig(state: GlobalState, {payload}: PayloadAction<Partial<ThemeConfigProps>>) {
            state.themeConfig = {
                ...state.themeConfig,
                ...payload
            }
        }
    }
})

export const {setToken, setUserInfo, setAssemblySize, setLanguage, setThemeConfig}  = globalSlice.actions

export default globalSlice.reducer