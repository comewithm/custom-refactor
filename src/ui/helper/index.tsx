import { UIInput, UIInputNumber } from "../modules/Input"
import { UISelect } from "../modules/Select"
import { UIFormItem } from "../modules/FormItem"
import { FormItemMixture } from "../interface"
import { UIRangePicker } from "../modules/RangePicker"


export const getElements = (field: FormItemMixture) => {
    const { type, itemProps, elementProps } = field
    let currentElement: JSX.Element
    switch (type) {
        case 'input':
            currentElement = <UIInput {...elementProps} />
            break
        case 'select':
            currentElement = <UISelect {...elementProps} />
            break
        case 'inputNumber':
            currentElement = <UIInputNumber {...elementProps} />
            break
        case 'rangePicker':
            currentElement = <UIRangePicker {...elementProps} />
            break
        default:
            currentElement = <></>
    }

    return (
        <UIFormItem {...itemProps} wrappedElement={currentElement} />
    )
}