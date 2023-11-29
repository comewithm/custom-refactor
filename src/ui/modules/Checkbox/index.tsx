import { Checkbox, Col, Row } from "antd"
import { CheckboxGroupProps } from "antd/es/checkbox"


export interface UICheckboxProps extends CheckboxGroupProps {
}
export const UICheckbox = (props: UICheckboxProps) => {
    const {value, onChange, options} = props
    return (
        <>
            <Checkbox.Group
                value={value}
                onChange={onChange}
            >
                <Row>
                    {
                        options?.map((item, idx) => {
                            return (
                                <Col key={`option_${idx}`}>
                                    <Checkbox
                                        value={item}
                                        disabled={value?.length === 1 && value[0] === item}
                                    >
                                        {item}
                                    </Checkbox>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Checkbox.Group>
        </>
    )
}