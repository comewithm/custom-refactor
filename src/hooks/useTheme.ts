import { useAppSelector } from "@/redux/store"


export const useTheme = () => {
    const {weakOrGray} = useAppSelector(state => state.global.themeConfig)

    const initTheme = () => {
        const body = document.documentElement as HTMLElement
        if(weakOrGray === 'default') {
            body.setAttribute("style", "")
        }
        if(weakOrGray === 'weak') {
            body.setAttribute("style", "filter: invert(80%)")
        }
        if(weakOrGray === 'gray') {
            body.setAttribute("style", "filter: grayscale(1)")
        }
    }

    initTheme()

    return {
        initTheme
    }
}