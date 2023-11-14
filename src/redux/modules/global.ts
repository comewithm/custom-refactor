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
    }
})

export const {setToken, setUserInfo}  = globalSlice.actions

export default globalSlice.reducer