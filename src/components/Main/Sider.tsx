import { Col, Flex, Image, Layout, Menu, Row } from "antd";
import { FileTextOutlined, HomeOutlined } from "@ant-design/icons";

import Logo from '../../assets/Logo.png'
import Ellipse from '../../assets/Ellipse.png'
import { Link, useLocation } from "react-router-dom";

const items = [
  {
    key: '/',
    icon: <HomeOutlined />,
    label: (
      <Link to='/'>Dashboard</Link>
    )
  },
  {
    key: '/todo',
    icon: <FileTextOutlined />,
    label: (
      <Link to='/todo'>Todo</Link>
    )
  }
]

const Sider = () => {
  const location = useLocation();

  return (
    <Layout.Sider
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Row gutter={[16, 32]} style={{ alignItems: 'center', padding: '20px 10px' }}>
        <Col span={12}>
          <Image src={Logo} width={122} />
        </Col>
        <Col span={12}>
          <Flex justify='flex-end' style={{ paddingTop: 10 }}>
            <Image src={Ellipse} width={24} />
          </Flex>
        </Col>
        <Col span={24}>
          <Menu theme='light' mode="inline" defaultSelectedKeys={[location.pathname]} items={items} style={{ borderRight: 'none' }} />
        </Col>
      </Row>
    </Layout.Sider>
  )
}

export default Sider