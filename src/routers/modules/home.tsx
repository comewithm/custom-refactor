import { PlatformLayout } from "@/layouts";
import { TRouteObject } from "../interface";
import { Home } from "@/components/Home";
import { TenantPage } from "@/pages/tenant";

const homeRouter: TRouteObject[] = [
    {
        element: <PlatformLayout />,
        children: [
            {
                path: "/home/index",
                element: <TenantPage />,
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