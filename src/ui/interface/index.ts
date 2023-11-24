import { UIFormItemProps } from "../modules/FormItem"
import { UIInputNumberProps, UIInputProps } from "../modules/Input"
import { UIRangePickerProps } from "../modules/RangePicker"
import { UISelectProps } from "../modules/Select"

export type FormItemPropsMap = {
    input: UIInputProps
    select: UISelectProps
    inputNumber: UIInputNumberProps
    rangePicker: UIRangePickerProps
}

export type FormItemPropsObj = {
    [K in keyof FormItemPropsMap]: {
      type: K;
      elementProps?: FormItemPropsMap[K];
    };
  };

export type FormItemMixture<T extends keyof FormItemPropsMap = keyof FormItemPropsMap> = {
    itemProps: Omit<UIFormItemProps, 'wrappedElement'>
} & FormItemPropsObj[T]
