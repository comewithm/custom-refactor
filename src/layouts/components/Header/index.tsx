
import {Layout} from 'antd'
import { CollapseIcon } from './components/CollapseIcon'
import { BreadcrumbNav } from './components/BreadcrumbNav'
import { AssemblySize } from './components/AssemblySize'

import './index.less'
import { Language } from './components/Language'
import { Theme } from './components/Theme'
import { AvatarIcon } from './components/AvatarIcon'

const {Header} = Layout

export const LayoutHeader = () => {

    return (
        <Header>
            <div className="header-left">
                <CollapseIcon />
                <BreadcrumbNav />
            </div>
            <div className="header-right">
                {/* size */}
                <AssemblySize />
                {/* language */}
                <Language />
                {/* theme */}
                <Theme />
                {/* full screen */}
                {/* avatar */}
                <AvatarIcon />
            </div>
        </Header>
    )
}