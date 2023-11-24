import { Col, Form, FormItemProps } from "antd"

export interface UIFormItemProps extends FormItemProps {
    wrapped?: boolean
    wrappedElement: JSX.Element
}

export const UIFormItem = (props: UIFormItemProps) => {
    const { wrapped = true, wrappedElement, ...rest } = props
    return (
        <>
            {
                wrapped
                    ?
                    <Form.Item {...rest}>
                        {wrappedElement}
                    </Form.Item>
                    :
                    wrappedElement
            }
        </>
    )
}