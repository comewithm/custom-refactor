import {Layout} from 'antd'
import { Outlet } from 'react-router-dom'
import { LayoutMenu } from './components/Menu'
import { LayoutHeader } from './components/Header'
import { useAppSelector } from '@/redux/store'

const {Sider, Content} = Layout

export const PlatformLayout = () => {

  const {isCollapsed} = useAppSelector(state => state.menu)

  return (
    <Layout>
      <Sider trigger={null} collapsed={isCollapsed} width={220}>
        {/* layout menu */}
        <LayoutMenu />
      </Sider>
      <Layout>
        {/* header */}
        <LayoutHeader />
        {/* layout tabs */}
        {/* layout content */}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}