import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuState } from "../interface";

const menuState:MenuState = {
    isCollapsed: false,
    menuList: []
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: menuState,
    reducers: {
        setCollapsed(state: MenuState, {payload}: PayloadAction<boolean>) {
            state.isCollapsed = payload
        },
        setMenuList(state: MenuState, {payload}: PayloadAction<Menu.MenuOptions[]>) {
            state.menuList = payload
        }
    }
})

export const {setCollapsed, setMenuList} =menuSlice.actions

export default menuSlice.reducer