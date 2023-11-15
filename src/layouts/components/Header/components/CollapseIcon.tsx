import { setCollapsed } from "@/redux/modules/menu"
import { useAppDispatch, useAppSelector } from "@/redux/store"
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"

export const CollapseIcon = () => {

    const dispatch = useAppDispatch()
    const {isCollapsed} = useAppSelector((state) => state.menu)

    return (
        <div className="collapsed" onClick={() => {dispatch(setCollapsed(!isCollapsed))}}>
            {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </div>
    )
}