import store from "@/redux/store";
import { fetchRefreshToken } from "../modules/login";
import { setToken } from "@/redux/modules/global";
import { getLocalStorage, setLocalStorage } from "@/utils/storage";
import { isTokenExpired } from "@/utils/util";
import { CustomAxiosHeaders, CustomAxiosRequestConfig } from "../interface/interceptor";

// token是否过期

// 校验token
export const authorizeToken = async (config: CustomAxiosRequestConfig) => {
    const { isToken = true } = config
    const tokenInfo = getLocalStorage()
    let token = tokenInfo.token

    console.log("config", config)
    // 接口请求前是否需要token校验
    if (isToken) {
        if (isTokenExpired(tokenInfo.tokenExpires)) {
            // token过期 refreshToken请求刷新token
            token = await getTokenByRefreshToken() 
        }
        // token未过期, 添加header头
        config.headers = {
            ...config.headers,
            'X-Bm-Authorization': token
        } as CustomAxiosHeaders
        console.log("need token");
    } else {
        console.log("not need token");
    }
}

// use refresh token to get token and store it
export const getTokenByRefreshToken = async (tokenInfo = getLocalStorage()) => {

    const { data } = await fetchRefreshToken({ refreshToken: tokenInfo.refreshToken })
    const { authorizationToken, expiresIn, refreshToken, refreshExpiresIn } = data!
    store.dispatch(setToken(data!))
    setLocalStorage({
        token: authorizationToken,
        tokenExpires: expiresIn + Date.now(),
        refreshToken,
        refreshExpires: refreshExpiresIn
    })

    return data!.authorizationToken
}