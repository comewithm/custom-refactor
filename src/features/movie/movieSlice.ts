import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MovieState {
    list: any[]
    totals: number
}

const initialState: MovieState = {
    list: [],
    totals: 0
}

const mockApi = 'http://127.0.0.1:4523/m1/3388340-0-default/getMovieListApi'

const getMovieListApi = () => fetch(mockApi).then(res => res.json())

export const getMovieData = createAsyncThunk(
    'movie/getMovie',
    async () => {
        const res = await getMovieListApi()
        return res
    } 
)

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        loadDataEnd: (state, {payload}) => {
            state.list = payload
            state.totals = payload.length
        }
    },
    extraReducers(builder) {
        builder
        .addCase(getMovieData.pending, (state, {payload}) => {
            console.log('进行中...', payload)
        })
        .addCase(getMovieData.fulfilled, (state, {payload}) => {
            console.log('fulfilled...', payload)
            state.list = payload
            state.totals = payload?.length
        })
        .addCase(getMovieData.rejected, (state, err) => {
            console.log('rejected...', err)
        })
    },
})

export const {loadDataEnd} = movieSlice.actions

export default movieSlice.reducer