import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interface";

const authState: AuthState = {
    authRouter: []
}

const authSlice = createSlice({
    name: 'auth',
    initialState: authState,
    reducers: {
        setAuthRouter(state: AuthState, {payload}: PayloadAction<string[]>) {
            state.authRouter = payload
        }
    }
})

export const {setAuthRouter} = authSlice.actions

export default authSlice.reducer