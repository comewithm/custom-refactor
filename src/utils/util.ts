
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