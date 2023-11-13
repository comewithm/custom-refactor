import { message } from 'antd'
import axios from 'axios'
import type {AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse} from 'axios'
import { AxiosCanceler } from './helper/axiosCancel'
import store from '@/redux/store'
import { ResultEnum } from '@/constants'
import { ApiResponse } from './interface'

const axiosCanceler = new AxiosCanceler()

const config = {
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 10 * 1000,
    withCredentials: true
}

class RequestHttp {
    service: AxiosInstance
    
    constructor(config: AxiosRequestConfig) {
        // 实例化axios
        this.service = axios.create(config)

        /**
         * @description 请求拦截器
         * token校验：接受服务器返回的token,存储到redux或者本地
         */
        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) => {
                axiosCanceler.addPending(config)
                // 登录接口不需要添加token响应头
                // TODO: 请求时是否设置loading
                // TODO: 抽离一个函数处理token问题 token失效时，需要重新refreshToken接口获取新的token并重新执行相关的操作
                const token = store.getState().global.tokenInfo.authorizationToken

                return {
                    ...config,
                    headers: {
                        ...config.headers,
                        "x-access-token": token
                    }
                }
            },
            (error: AxiosError) => {
                return Promise.reject(error)
            }
        )

        /**
         * @description 响应拦截器
         */
        this.service.interceptors.response.use(
            (response: AxiosResponse) => {
                const {data, config} = response
                // 请求结束后,清除请求
                axiosCanceler.removePending(config)
                // 登录失效处理(code == 10001)
                if(data.code == ResultEnum.LOGIN_FAILED) {
                    message.error(data.msg)
                    window.location.hash = '/login'
                    return Promise.reject(data)
                }
                // 全局错误信息处理
                if(data.code !== ResultEnum.SUCCESS) {
                    message.error(data.msg)
                    return Promise.reject(data)
                }
                // 成功请求
                return data
            },
            async (error: AxiosError) => {
                const {response} = error
                // 超时单独判断，请求超时没有response
                if(error.message.indexOf("timeout") !== -1) {
                    message.error("请求超时")
                }
                // 根据响应的错误状态码做不同的处理
                if(response) {
                    checkStatus(response.status)
                }
                
                return Promise.reject(error)
            }
        )
    }

    get<T>(
        url:string,
        params?: object,
        options = {}
    ): Promise<ApiResponse<T>> {
        return this.service.get(url, {params, ...options})
    }
    post<T>(
        url:string,
        params?: object,
        options = {}
    ): Promise<ApiResponse<T>> {
        return this.service.post(url, params, options)
    }
    put<T>(
        url:string,
        params?: object,
        options = {}
    ): Promise<ApiResponse<T>> {
        return this.service.put(url, params, options)
    }
    delete<T>(
        url:string,
        params?: object,
        options = {}
    ): Promise<ApiResponse<T>> {
        return this.service.delete(url, {params, ...options})
    }
    
}

export default new RequestHttp(config)