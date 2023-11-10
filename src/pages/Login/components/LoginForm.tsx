import { useAppDispatch } from "@/hooks"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input } from "antd"
import { useState } from "react"

import {Login} from '@/interface/login'

const {Item} = Form

const LoginForm = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()

    const onFinish = (loginForm:Login.ReqParams) => {
        // TODO: 
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