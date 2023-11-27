import { Input, InputNumber, InputNumberProps, InputProps } from "antd"
import { PasswordProps, SearchProps, TextAreaProps } from "antd/es/input"

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

export interface UIInputPasswordProps extends PasswordProps {

}
export const UIInputPassword = (props: UIInputPasswordProps) => {

    return (
        <Input.Password {...props} />
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

export interface UIInputNumberProps extends InputNumberProps {
    
}
export const UIInputNumber = (props:UIInputNumberProps) => {
    return (
        <InputNumber {...props} />
    )
}

export interface UITextAreaProps extends TextAreaProps {

}
export const UITextArea = (props: UITextAreaProps) => {

    return (
        <Input.TextArea {...props} />
    )
}