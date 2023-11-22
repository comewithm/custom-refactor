import { UIFormItemProps } from "../modules/FormItem"
import { UIInputProps } from "../modules/Input"
import { UISelectProps } from "../modules/Select"

export type FieldType = 'input' | 'select'

export type UIElementProps<T extends FieldType> = {
    input: UIInputProps
    select: UISelectProps
}[T]

// 根据type类型得到对应的elementProps类型
export interface FieldOptions {
    type: FieldType,
    itemProps: Omit<UIFormItemProps, 'wrappedElement'>
    elementProps: UIElementProps<FieldType>
}