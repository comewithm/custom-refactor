import { setLanguage } from "@/redux/modules/global"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Dropdown, MenuProps } from "antd"


export const Language = () => {

    const dispatch = useAppDispatch()

    const {language} = useAppSelector(state => state.global)

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: <span>简体中文</span>,
            disabled: language === 'zh',
            onClick: () => dispatch(setLanguage('zh'))
        },
        {
            key: '2',
            label: <span>English</span>,
            disabled: language === 'en',
            onClick: () => dispatch(setLanguage('en'))
        },
    ]

    return (
        <Dropdown menu={{items}} placement={'bottom'} trigger={['click']} arrow>
            <i className="icon-style iconfont icon-zhongyingwen"></i>
        </Dropdown>
    )
}