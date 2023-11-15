import { Login } from "@/api/interface";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import { GlobalAssemblySize, GlobalState, ThemeConfigProps } from "../interface";

const globalState: GlobalState = {
    tokenInfo: {
        tokenId: '',
        authorizationToken: '',
        refreshToken: '',
        refreshExpiresIn: -1,
        expiresIn: -1
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
                ...state.tokenInfo,
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
        setLanguage(state:GlobalState, {payload}: PayloadAction<string>) {
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