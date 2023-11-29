import {DatePicker, TimeRangePickerProps} from 'antd'

const {RangePicker} = DatePicker

export interface UIRangePickerProps extends TimeRangePickerProps {

}
export const UIRangePicker = (props: UIRangePickerProps) => {
    return (
        <RangePicker {...props} />
    )
}