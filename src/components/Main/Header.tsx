import Cookies from 'js-cookie';
import type { MenuProps } from 'antd';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from '../../app/hooks';
import { clearAuth } from '../../features/auth/authSlice';
import { clearUser } from '../../features/user/userSlice';
import { CalendarOutlined, LogoutOutlined, SearchOutlined } from "@ant-design/icons";
import { Avatar, Badge, Col, Dropdown, Flex, Input, Layout, Row, Typography } from "antd";

const { Text } = Typography;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(clearAuth());
    dispatch(clearUser());
    navigate('/login');
  };

  const items: MenuProps['items'] = [
    {
      label: 'Logout',
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: handleLogout
    }
  ];

  const user = useAppSelector((state) => state.user);

  return (
    <Layout.Header style={{ padding: '11px 24px', lineHeight: 0 }}>
      <Row gutter={16}>
        <Col span={19}>
          <Input
            size="large"
            placeholder="Search"
            style={{ background: '#F1F3F4', border: 'none' }}
            prefix={<SearchOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
          />
        </Col>
        <Col span={1}>
          <Flex justify="flex-end" style={{ paddingTop: 6 }}>
            <CalendarOutlined style={{ fontSize: 24, color: '#4F4F4F' }} />
          </Flex>
        </Col>
        <Col span={4}>
          <Flex justify="flex-end">
            <Dropdown menu={{ items }} trigger={['click']}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, cursor: 'pointer' }}>
                <div style={{ textAlign: "right" }}>
                  <Text strong>{user.name}</Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Admin
                  </Text>
                </div>
                <Badge
                  dot
                  status="success"
                  offset={[-5, 35]}
                  style={{ backgroundColor: "#52c41a" }}
                >
                  <Avatar
                    src="https://i.pravatar.cc/300"
                    size={40}
                    style={{ border: "1px solid #ddd" }}
                  />
                </Badge>
              </div>
            </Dropdown>
          </Flex>
        </Col>
      </Row>
    </Layout.Header>
  )
}

export default Header