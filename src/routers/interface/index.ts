export interface MetaProps {
    requiresAuth?: boolean
    title: string
    key?: string
}

export type TRouteObject = {
    caseSensitive?: boolean
    children?: TRouteObject[]
    element?:React.ReactNode
    index?: boolean
    path?: string

    meta?: MetaProps,
    isLink?: boolean
}