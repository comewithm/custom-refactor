import store from "@/redux/store";
import { AxiosRequestConfig } from "axios";
import { fetchRefreshToken } from "../modules/login";
import { setToken } from "@/redux/modules/global";
import { LOCAL_STORE_KEY } from "@/constants";
import { LocalTokenInfo } from "@/redux/interface";
import { useLocalStorageState } from "ahooks";

// token是否过期
const isTokenExpired = (expires: number = Infinity) => {
    return Date.now() > expires
}

// 校验token
export const authorizeToken = async (config: AxiosRequestConfig) => {
    const {isToken = true} = config
    // const [tokenInfo, setTokenInfo] = useLocalStorageState<LocalTokenInfo>(LOCAL_STORE_KEY.TOKEN_INFO)
    // const {token, refreshToken, tokenExpires} = tokenInfo!
    const {authorizationToken:token, refreshToken, expiresIn:tokenExpires} = store.getState().global.tokenInfo
    console.log("config", config)
    console.log("store.getState().global.tokenInfo", store.getState().global.tokenInfo)
    // 接口请求前是否需要token校验
    if(isToken) {
        if(isTokenExpired(tokenExpires)) {
            // TODO: token过期 refreshToken请求刷新token
            const {authorizationToken: newToken} = await getTokenByRefreshToken(refreshToken)
            config.headers = {
                ...config.headers,
                'X-Bm-Authorization': newToken
            }
        } else {
            // token未过期, 添加header头
            config.headers = {
                ...config.headers,
                'X-Bm-Authorization': token
            }
        }
        console.log("need token");
    } else {
        console.log("not need token");
    }
    return config
}

// use refresh token to get token and store it
export const getTokenByRefreshToken = async (refresh: string) => {
    // const [, setTokenInfo] = useLocalStorageState<LocalTokenInfo>(LOCAL_STORE_KEY.TOKEN_INFO)
    const {data} = await fetchRefreshToken({refreshToken: refresh})
    const {authorizationToken: token, expiresIn: tokenExpires, refreshToken} = data!
    store.dispatch(setToken(data!))
    // setTokenInfo({
    //     token,
    //     tokenExpires,
    //     refreshToken
    // })
    return data
}