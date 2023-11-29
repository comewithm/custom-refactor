import { AxiosHeaders, InternalAxiosRequestConfig } from "axios";

// 扩展请求传入参数
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    isToken?: boolean;
}

// 定义包含自定义属性的请求头类型
export interface CustomAxiosHeaders extends AxiosHeaders {
    'X-Bm-Authorization'?: string;
  // 添加其他自定义属性
}