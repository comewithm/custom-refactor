import { decrement, increment, incrementByAmount } from "../../features/counter/counterSlice"
import {getMovieData} from '../../features/movie/movieSlice'
import { useAppDispatch, useAppSelector } from "../../hooks"

import {Button} from 'antd'

export const Counter = () => {

    const {value} = useAppSelector(store => store.counter)
    const dispatch = useAppDispatch()

    const {list} = useAppSelector(store => store.movie)

    return (
        <div>
            <div>Counter: {value}</div>

            <Button size={'large'} onClick={() => dispatch(increment({value: 5}))}>add</Button>
            <Button size={'large'} onClick={() => dispatch(decrement())}>minus</Button>
            <Button size={'large'} onClick={() => dispatch(incrementByAmount(2))}>custom</Button>
            <Button size={'large'} onClick={() => dispatch(getMovieData())}>get data</Button>

            <div>
                {
                    list?.map((item, idx) => (
                        <div key={idx}>{item.name}</div>
                    ))
                }
            </div>
        </div>
    )
}