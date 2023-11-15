import { useAppSelector } from "@/redux/store"
import { Breadcrumb } from "antd"
import { useLocation } from "react-router-dom"


export const BreadcrumbNav = () => {

    const {pathname} = useLocation()
    const {breadcrumbList} = useAppSelector(state => state.breadcrumb)

    const list = breadcrumbList[pathname]?.items

    return (
        <Breadcrumb items={list} />
    )
}