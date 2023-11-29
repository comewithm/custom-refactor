import { PlatformLayout } from "@/layouts";
import { TenantPage } from "@/pages/tenant";
import { RouteObject } from "react-router-dom";

const homeRouter: RouteObject[] = [
    {
        element: <PlatformLayout />,
        children: [
            {
                path: "/home/index",
                element: <TenantPage />,
                // meta: {
                //     requiresAuth: true,
                //     title: "home",
                //     key: 'home'
                // }
            }
        ]
    }
]

export default homeRouter