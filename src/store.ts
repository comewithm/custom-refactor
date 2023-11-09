import {configureStore} from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import movieSlice from './features/movie/movieSlice'

const store = configureStore({
    reducer: {
        counter: counterReducer,
        movie: movieSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch