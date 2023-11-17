
export const getBrowserLanguage = () => {
    const browserLang = navigator.language
    let defaultLang = ''

    if(['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase())) {
        defaultLang = 'zh'
    } else {
        defaultLang = 'en'
    }

    return defaultLang
}

export const isTokenExpired = (expires: number = Infinity) => {
    return Date.now() > expires
}