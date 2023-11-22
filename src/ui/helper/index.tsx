import { Col } from "antd"
import { UIInput } from "../modules/Input"
import { UISelect } from "../modules/Select"
import { UIFormItem } from "../modules/FormItem"


export const getElements = (fieldList: any[]) => {
    return fieldList.map((field, idx) => {
        const { type, itemProps, elementProps } = field
        let currentElement: JSX.Element
        switch (type) {
            case 'input':
                currentElement = <UIInput {...elementProps} />
                break
            case 'select':
                currentElement = <UISelect {...elementProps} />
                break
            default:
                currentElement = <UIInput {...elementProps} />
        }

        return (<Col span={8} key={idx}>
            <UIFormItem {...itemProps} wrappedElement={currentElement} />
        </Col>)
    })
}