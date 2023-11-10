import { RouteObject } from "react-router-dom";

export interface MetaProps {
    requiresAuth?: boolean
    title: string
    key?: string
}

export type TRouteObject = RouteObject | {
    meta?: MetaProps,
    isLink?: boolean
}