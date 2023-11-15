import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

import counterReducer from './modules/counterSlice'
import movieSlice from './modules/movieSlice'
import globalSlice from './modules/global'
import menuSlice from './modules/menu'
import breadcrumbSlice from './modules/breadcrumb'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        movie: movieSlice,
        global: globalSlice,
        menu: menuSlice,
        breadcrumb: breadcrumbSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector