import { Input, InputProps } from "antd"
import { SearchProps } from "antd/es/input"

const {Search} = Input

export interface UIInputProps extends InputProps {
    // 自定义参数
}

export const UIInput = (props: UIInputProps) => {
    const {...rest} = props

    return (
        <Input
            {...rest}
        />
    )
}

export interface UISingleSearchProps extends SearchProps {
    // 自定义参数
}

export const UISingleSearch = (props: UISingleSearchProps) => {
    const {...rest} = props
    return (
        <Search 
            {...rest}
        />
    )
}