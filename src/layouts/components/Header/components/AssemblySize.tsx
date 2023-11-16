import { GlobalAssemblySize } from "@/redux/interface"
import { setAssemblySize } from "@/redux/modules/global"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { Dropdown, MenuProps } from "antd"
import { useTranslation } from "react-i18next"


export const AssemblySize = () => {
    const dispatch = useAppDispatch()
    const {t} = useTranslation(['ns1'])
    const {assemblySize} = useAppSelector(state => state.global)

    const onClick = (e: MenuInfo) => {
        dispatch(setAssemblySize(e.key as GlobalAssemblySize))
    }

    const items:MenuProps['items'] = [
        {
            key: 'middle',
            disabled: assemblySize === 'middle',
            label: <span>{t('header.default')}</span>,
            onClick
        },
        {
            key: 'large',
            disabled: assemblySize === 'large',
            label: <span>{t('header.large')}</span>,
            onClick
        },
        {
            key: 'small',
            disabled: assemblySize === 'small',
            label: <span>{t('header.small')}</span>,
            onClick
        }
    ]

    return (
        <Dropdown menu={{items}} placement={'bottom'} trigger={['click']} arrow>
            <i className="icon-style iconfont icon-contentright"></i>
        </Dropdown>
    )
}