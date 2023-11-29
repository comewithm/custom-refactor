import { useAppDispatch } from "@/redux/store"
import { LockOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, message } from "antd"
import { useState } from "react"
// import {md5} from 'js-md5'
import {Login} from '@/api/interface'
import { fetchLoginIn, fetchPublicKey } from "@/api/modules/login"
import { setToken, setUserInfo } from "@/redux/modules/global"
import { useNavigate } from "react-router-dom"
import { encryption } from "@/utils/jsencrypt"
import { useLocalStorageState } from "ahooks"
import { LOCAL_STORE_KEY } from "@/constants"
import { LocalTokenInfo } from "@/redux/interface"

const {Item} = Form

const LoginForm = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [ , setLocalTokenInfo] = useLocalStorageState<LocalTokenInfo>(LOCAL_STORE_KEY.TOKEN_INFO, {})

    const onFinish = async (loginForm:Login.ReqParams) => {
        try {
            setLoading(true)
            if(true) {
                const {data: {publicKey} = {publicKey: ''}} = await fetchPublicKey()
                loginForm.userPwd = encryption(publicKey!, loginForm.userPwd)
                const {success, data} = await fetchLoginIn({...loginForm, publicKey})
                const {tokenEntity: {refreshToken, authorizationToken, expiresIn, refreshExpiresIn}} = data!
                // 存储token => 本地 or redux
                dispatch(setToken(data?.tokenEntity!))
                dispatch(setUserInfo(data?.currentLoginUser!))
                setLocalTokenInfo({
                    token: authorizationToken,
                    tokenExpires: expiresIn + Date.now(),
                    refreshToken: refreshToken,
                    refreshExpires: refreshExpiresIn
                })
                if(success) {
                    message.success('登录成功')
                    // 跳转
                    navigate('/home/index')
                }
            } else {
                message.success('登录成功')
                navigate('/home/index')
            }
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