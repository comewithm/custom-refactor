import { PlatformLayout } from "@/layouts";
import { TRouteObject } from "../interface";
import { Home } from "@/components/Home";


const homeRouter: TRouteObject[] = [
    {
        element: <PlatformLayout />,
        children: [
            {
                path: "/home/index",
                element: <Home />,
                meta: {
                    requiresAuth: true,
                    title: "home",
                    key: 'home'
                }
            }
        ]
    }
]

export default homeRouter