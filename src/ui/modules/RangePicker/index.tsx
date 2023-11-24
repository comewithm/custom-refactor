import {DatePicker, TimeRangePickerProps} from 'antd'

const {RangePicker, TimePicker} = DatePicker

export interface UIRangePickerProps extends TimeRangePickerProps {

}
export const UIRangePicker = (props: UIRangePickerProps) => {
    return (
        <RangePicker {...props} />
    )
}