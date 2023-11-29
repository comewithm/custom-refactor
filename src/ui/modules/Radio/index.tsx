import { Radio, RadioGroupProps } from "antd"

// TODO: Radio
export interface UIRadioProps extends RadioGroupProps {
    // radioGroupProps: RadioGroupProps
}

export const UIRadio = (props: UIRadioProps) => {

    return (
        <Radio.Group
            {...props}
        />
    )
}