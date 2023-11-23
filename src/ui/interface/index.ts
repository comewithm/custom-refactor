import { UIFormItemProps } from "../modules/FormItem"
import { UIInputProps } from "../modules/Input"
import { UISelectProps } from "../modules/Select"

export type FormItemPropsMap = {
    input: UIInputProps
    select: UISelectProps
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
