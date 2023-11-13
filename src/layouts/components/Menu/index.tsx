import { flattenMenuList, getMenuList }  from "@/utils/menu"
import { MenuItem } from "@/layouts/interface"
import { RootState, useAppDispatch, useAppSelector } from "@/redux/store"
import { Menu, Spin } from "antd"
import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

import { setMenuList as setReduxMenuList } from "@/redux/modules/menu" 

/**
 * 1.获取menu list列表 最好做成配置
 */
export const LayoutMenu = () => {
    const {pathname} = useLocation()
    const dispatch = useAppDispatch()
    const {isCollapsed, menuList: reduxMenuList} = useAppSelector((state:RootState) => state.menu)

    const [loading, setLoading] = useState(false)
    const [menuList, setMenuList] = useState<MenuItem[]>([])

    const [openKeys, setOpenKeys] = useState<string[]>([])
    const [selectedKeys, setSelectedKeys] = useState<string[]>([])

    // 获取menuList列表
    const getMenuDataList = async () => {
        setLoading(true)
        try {
            const list = await getMenuList()
            setMenuList(flattenMenuList(list))
            // TODO:面包屑导航栏存储
            // TODO:存储路由菜单，做菜单权限判断
            dispatch(setReduxMenuList(list))
        } finally {
            setLoading(false)
        }
    }
    // menu list初始化
    useEffect(() => {
        getMenuDataList()
    }, [])

    // 刷新
    useEffect(() => {
        setSelectedKeys([pathname])
        // TODO: 不展示侧边栏
        if(!isCollapsed) {}
    }, [pathname, isCollapsed])

    const onMenuClick = () => {

    }

    const onOpenChange = () => {}


    return (
        <div className="menu">
            <Spin spinning={loading} tip={'Loading...'}>
                <Menu
                    theme={'dark'}
                    mode={'inline'}
                    triggerSubMenuAction={'click'}
                    openKeys={openKeys}
                    selectedKeys={selectedKeys}
                    items={menuList}
                    onClick={onMenuClick}
                    onOpenChange={onOpenChange}
                />
            </Spin>
        </div>
    )
}