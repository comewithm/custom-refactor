
import {Input} from 'antd'
import { SearchProps } from 'antd/es/input'
import { ChangeEvent } from 'react'

const {Search} = Input

interface SingleSearchProps {
    /**搜索框输入 */
    onChange: (...args: any[]) => void
    /**搜索输入框内容 */
    onSearch: SearchProps['onSearch']
}
// TODO: 待补充Search的所有props属性
export const SingleSearch = (props: SingleSearchProps) => {

    const {onChange, onSearch} = props

    const onSearchChange = (e:ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        onChange(value)
    }

    return (
        <Search
            placeholder={'请输入...'}
            allowClear
            onChange={(e) => onSearchChange(e)}
            onSearch={onSearch}
            style={{
                width: 300
            }}
        />
    )
}