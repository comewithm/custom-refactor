import { ThemeConfigProps } from "@/redux/interface"
import { setThemeConfig } from "@/redux/modules/global"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { FireOutlined } from "@ant-design/icons"
import { Divider, Drawer, Switch } from "antd"
import { useState } from "react"


export const Theme = () => {
    const dispatch = useAppDispatch()
    const {themeConfig: {weakOrGray}} = useAppSelector(state => state.global)

    const [visible, setVisible] = useState(false)

    const changeVisible = (flag: boolean) => {
        setVisible(flag)
    }

    const onThemeChange = (checked: boolean, theme: ThemeConfigProps['weakOrGray']) => {
        if(checked) {
            return dispatch(setThemeConfig({
                weakOrGray: theme
            }))
        }
        dispatch(setThemeConfig({
            weakOrGray: 'default'
        }))
    }

    return (
        <>
        <i className="icon-style iconfont icon-zhuti" onClick={() => changeVisible(true)}></i>
            <Drawer
                title={'布局设置'}
                width={320}
                closable={false}
                onClose={() => changeVisible(false)}
                open={visible}
            >
                <Divider className="divider">
                    <FireOutlined />
                    全局主题
                </Divider>

                <div className="theme-item">
                    <span>暗黑模式(未设置样式)</span>
                    <Switch
                        checkedChildren={<>🌞</>}
                        unCheckedChildren={<>🌛</>}
                    />
                </div>
                <div className="theme-item">
                    <span>灰色模式</span>
                    <Switch 
                        checked={weakOrGray === 'gray'}
                        onChange={e => onThemeChange(e, 'gray')}
                    />
                </div>
                <div className="theme-item">
                    <span>色弱模式</span>
                    <Switch 
                        checked={weakOrGray === 'weak'}
                        onChange={e => onThemeChange(e, 'weak')}
                    />
                </div>
            </Drawer>
        </>
    )
}