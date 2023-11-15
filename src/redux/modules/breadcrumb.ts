import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BreadcrumbState } from "../interface";

const breadcrumbState: BreadcrumbState = {
    breadcrumbList: {}
}

const breadcrumbSlice = createSlice({
    name: "breadcrumb",
    initialState: breadcrumbState,
    reducers: {
        setBreadcrumb(state: BreadcrumbState, {payload}: PayloadAction<BreadcrumbState['breadcrumbList']>) {
            state.breadcrumbList = payload
        }
    }
})

export const {setBreadcrumb} = breadcrumbSlice.actions

export default breadcrumbSlice.reducer