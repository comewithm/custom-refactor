import { Select, SelectProps } from "antd"

export interface UISelectProps extends SelectProps {
    // 自定义参数
}

export const UISelect = (props: UISelectProps) => {
    const {
        value,
        options,
        ...rest
    } = props

    return (
        <Select
            {...rest}
            value={value}
            options={options}
        />
    )
}