import { message } from "antd"


export const checkStatus = (status: number) => {
    switch(status) {
        case 400:
            message.error('请求失败，请稍后再试')
            break;
        case 401:
            message.error('登录失效，请重新登录')
            break;
        case 403:
            message.error('当前账号无访问权限')
            break;
        case 404:
            message.error('访问资源不存在')
            break;
        case 408:
            message.error('请求超时，请稍后再试')
            break;
        case 502:
            message.error('服务异常')
            break;
        case 503:
            message.error('服务不可用')
            break;
        case 504:
            message.error('网关超时')
            break;
        default:
            message.error('请求失败')
            break;
    }
}