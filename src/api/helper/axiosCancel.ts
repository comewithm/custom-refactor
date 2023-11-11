import { isFunction } from '@/utils/isType'
import axios, {AxiosRequestConfig, Canceler} from 'axios'
import qs from 'qs'

const pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) => {
    const {method, url, data, params} = config
    return [method, url, qs.stringify(data), qs.stringify(params)].join("&")
}

export class AxiosCanceler {

    addPending(config: AxiosRequestConfig) {
        // 请求之前，对之前的请求做检查取消操作
        this.removePending(config)
        const url = getPendingUrl(config)
        config.cancelToken = config.cancelToken || new axios.CancelToken(cancel => {
            if(!pendingMap.has(url)) {
                // 如果pending中不存在当前请求，则添加进去
                pendingMap.set(url, cancel)
            }
        })
    }

    removePending(config: AxiosRequestConfig) {
        const url = getPendingUrl(config)

        if(pendingMap.has(url)) {
            // pending中存在当前请求标识，需要取消当前请求，并移除
            const cancel = pendingMap.get(url)
            cancel && cancel()
            pendingMap.delete(url)
        }
    }

    removeAllPending() {
        pendingMap.forEach(cancel => {
            if(cancel && isFunction(cancel)) {
                cancel()
            }
        })
        this.reset()
    }

    reset() {
        pendingMap.clear()
    }
}