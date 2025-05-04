import { Layout } from 'antd'
import Sider from './Sider'
import Header from './Header'
import Content from './Content'
import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider />
      <Layout>
        <Header />
        <Content>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Main