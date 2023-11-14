import { menuList } from "@/constants";
import { MenuItem } from "@/layouts/interface";

export const getItem = (
    {
        label,
        key,
        icon,
        children,
        type
    } : {
        label: React.ReactNode,
        key?: React.Key | null,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: "group"
    }
): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type
    } as MenuItem
}

// mock获取menu list数据列表
export const getMenuList = ():Promise<Menu.MenuOptions[]> => {
    return new Promise((resolve, reject) => {
        resolve(menuList)
    })
}

// 递归遍历menu list
export const switchListToMenuItemList = (menuList: Menu.MenuOptions[]): MenuItem[] => {
    return menuList.reduce((flattenedList, menu) => {
        const {title:label, path:key, icon, children} = menu
        if (!!children?.length) {
            flattenedList.push(getItem({
                label,
                key,
                icon,
                children: switchListToMenuItemList(children)
            }));
        } else {
            flattenedList.push(getItem({
                label,
                key,
                icon
            }));
        }
        return flattenedList;
    }, [] as MenuItem[]);
}

/**
 * 
 * @param path 以/开头的pathname
 * '/terminal/a/1' => terminal/a/1
 * ["/terminal", "/terminal/a"] 
 */
export const getSubMenuKeys = (path: string) => {
    const paths = path.slice(1).split('/')
    let currentStr = ''
    const result:string[] = []
    
    for (let i = 0; i < paths.length - 1; i++) {
        currentStr += `/${paths[i]}`;
        result.push(currentStr)
    }
    return result
}