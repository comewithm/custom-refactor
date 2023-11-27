import { Form, FormItemProps } from "antd"

export interface UIFormItemProps extends FormItemProps {
    visible?: boolean
    wrapped?: boolean
    wrappedElement: JSX.Element
}

export const UIFormItem = (props: UIFormItemProps) => {
    const { visible = true, wrapped = true, wrappedElement, ...rest } = props
    return (
        <>
            {
                visible ?
                    wrapped
                        ?
                        <Form.Item {...rest}>
                            {wrappedElement}
                        </Form.Item>
                        :
                        wrappedElement
                    : null
            }
        </>
    )
}