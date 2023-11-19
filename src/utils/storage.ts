import { LOCAL_STORE_KEY } from "@/constants";
import { LocalTokenInfo } from "@/redux/interface";

const serializer = <T>(value: T) => {
    return JSON.stringify(value);
};

const deserializer = <T>(value: string): T => {
    return JSON.parse(value);
};

export const setLocalStorage = (info: LocalTokenInfo) => {
    localStorage.setItem(LOCAL_STORE_KEY.TOKEN_INFO, serializer(info))
}

export const getLocalStorage = () => {
    const str = localStorage.getItem(LOCAL_STORE_KEY.TOKEN_INFO)
    return deserializer<LocalTokenInfo>(str || '{}')
}