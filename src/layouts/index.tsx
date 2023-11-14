import {Layout} from 'antd'
import { Outlet } from 'react-router-dom'
import { LayoutMenu } from './components/Menu'

const {Sider, Content} = Layout

export const PlatformLayout = () => {

  return (
    <Layout>
      <Sider>
        {/* layout menu */}
        <LayoutMenu />
      </Sider>
      <Layout>
        {/* header */}
        {/* <LayoutHeader /> */}
        {/* layout tabs */}
        {/* layout content */}
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}