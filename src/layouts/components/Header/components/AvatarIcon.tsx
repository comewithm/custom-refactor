import { Avatar, Dropdown, Modal, message } from "antd"

import avatar from '@/assets/images/avatar.png'
import { ExclamationCircleOutlined } from "@ant-design/icons"
import { useAppDispatch } from "@/redux/store"
import { useNavigate } from "react-router-dom"
import { setToken } from "@/redux/modules/global"

export const AvatarIcon = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const loginOut = () => {
        Modal.confirm({
            title: 'login out',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认退出登录?',
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
                dispatch(setToken({}))
                message.success('退出登录成功')
                navigate('/login')
            }
        })
    }

    const items = [
        {
            key: '1',
            label: <span className="dropdown-item">退出登录</span>,
            onClick: loginOut
        }
    ]

    return (
        <>
            <Dropdown menu={{items}} placement={'bottom'} arrow trigger={['click']}>
                <Avatar size={'large'} src={avatar} />
            </Dropdown>
        </>
    )
}