import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

import counterReducer from './modules/counterSlice'
import movieSlice from './modules/movieSlice'
import globalSlice from './modules/global'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        movie: movieSlice,
        global: globalSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector