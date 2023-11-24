import { Radio, RadioGroupProps, RadioProps } from "antd"

// TODO: Radio
export interface UIRadioProps extends RadioProps {
    // radioGroupProps: RadioGroupProps
}

export const UIRadio = (props: UIRadioProps) => {

    return (
        <Radio.Group
            {...props}
        />
    )
}