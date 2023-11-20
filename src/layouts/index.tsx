import {Layout} from 'antd'
import { Outlet } from 'react-router-dom'
import { LayoutMenu } from './components/Menu'
import { LayoutHeader } from './components/Header'
import { useAppSelector } from '@/redux/store'

import './index.less'

const {Sider, Content} = Layout

export const PlatformLayout = () => {

  const {isCollapsed} = useAppSelector(state => state.menu)

  return (
    <Layout className='container'>
      {/* header */}
      <LayoutHeader />
      <Layout className='box-main'>
        {/* layout menu */}
        <Sider className='box-sider' trigger={null} collapsed={isCollapsed} width={220}>
          <LayoutMenu />
        </Sider>
        {/* layout tabs */}
        {/* layout content */}
        <Content className='box-content'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}