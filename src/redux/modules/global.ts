import { Login } from "@/api/interface";
import { createSlice } from "@reduxjs/toolkit";
import type {PayloadAction} from '@reduxjs/toolkit'
import { GlobalState } from "../interface";

const globalState: GlobalState = {
    tokenInfo: {
        tokenId: '',
        authorizationToken: '',
        refreshToken: '',
        refreshExpiresIn: -1,
        expiresIn: -1
    },
    userInfo: {}
}

const globalSlice = createSlice({
    name: 'global',
    initialState: globalState,
    reducers: {
        setToken(state:GlobalState, {payload}: PayloadAction<Login.LoginRes>) {
            const {currentLoginUser, tokenEntity} = payload
            // TODO:token本地存储，过期需要重新请求refreshToken接口
            state.tokenInfo = tokenEntity
            state.userInfo = currentLoginUser
        },
    }
})

export const {setToken}  = globalSlice.actions

export default globalSlice.reducer