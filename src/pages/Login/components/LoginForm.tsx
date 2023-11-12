import { useAppDispatch } from "@/redux/store"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { useState } from "react"
import {md5} from 'js-md5'
import {Login} from '@/api/interface'
import { loginApi } from "@/api/modules/login"
import { setToken } from "@/redux/modules/global"
import { useNavigate } from "react-router-dom"

const {Item} = Form

const LoginForm = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onFinish = async (loginForm:Login.ReqParams) => {
        try {
            setLoading(true)
            loginForm.userPwd = md5(loginForm.userPwd)

            // const {success, data} = await loginApi(loginForm)
            // // 存储token
            // dispatch(setToken(data!))
            message.success('登录成功')
            // 跳转
            navigate('/home/index')
        } finally {
            setLoading(false)
        }
    }

    const onFinishFailed = (error:any) => {
        console.log('login failed: ', error)
    }

    return (
        <Form
            form={form}
            size={'large'}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Item name={"userName"} rules={[{required: true, message: 'please input your username'}]}>
                <Input placeholder={'username'} prefix={<UserOutlined />} />
            </Item>
            <Item name={"userPwd"} rules={[{required: true, message: 'please input your password'}]}>
                <Input.Password placeholder={'password'} autoComplete={'new-password'} prefix={<LockOutlined />} />
            </Item>
            <Item className="login-btn">
                <Button 
                    type={'primary'} 
                    htmlType={'submit'} 
                    loading={loading}
                    icon={<UserOutlined />}
                >
                    confirm
                </Button>
            </Item>
        </Form>
    )
}

export default LoginForm