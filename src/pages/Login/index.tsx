import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { setUser } from '../../features/user/userSlice';
import { setToken } from '../../features/auth/authSlice';
import { decodeToken, generateToken } from '../../utils/jwt';
import { Button, Card, Col, Divider, Form, Image, Input, Row, Typography, message } from 'antd';

import VectorLogin from '../../assets/VectorLogin.png';

const { Title } = Typography;

interface ValuesInterface {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: ValuesInterface) => {
    const { email, password } = values;

    if (email !== 'aditya@gmail.com' || password !== 'password123') {
      return messageApi.open({
        type: 'error',
        content: 'Email atau password salah!',
      });
    }
  
    const token = generateToken(email, 'local');
    Cookies.set('token', token);
  
    const decoded = decodeToken(token);
    dispatch(setToken());
    dispatch(setUser({ email: decoded.email, provider: decoded.provider, name: 'Aditya Nugraha' }));
  
    navigate('/');
  };

  const handleGoogleLogin = () => {
    const fakeGoogleEmail = 'aditya@gmail.com';
    const provider = 'google';
  
    const token = generateToken(fakeGoogleEmail, provider);
    Cookies.set('token', token);
  
    const decoded = decodeToken(token);
    dispatch(setToken());
    dispatch(setUser({ email: decoded.email, provider: decoded.provider, name: 'Aditya Nugraha' }));
  
    navigate('/');
  };

  return (
    <Row style={{ minHeight: '100vh' }}>
      <Col
        span={12}
        style={{
          backgroundColor: '#F8FAFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Image
          src={VectorLogin}
          alt="Vector Login"
          preview={false}
        />
      </Col>
      <Col
        span={12}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '40px',
        }}
      >
        <Card style={{ border: 'none', maxWidth: 480 }}>
          <Form
            layout="vertical"
            onFinish={onFinish}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Title level={2}>
                  Welcome Back
                </Title>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  initialValue="aditya@gmail.com"
                  rules={[{ required: true, message: 'Please input your email!' }, { type: 'email' }]}
                >
                  <Input
                    placeholder="Email"
                    style={{ borderRadius: 8, padding: '10px 12px' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Password"
                  name="password"
                  initialValue="password123"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder="Password"
                    style={{ borderRadius: 8, padding: '10px 12px' }}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    style={{ borderRadius: 8, height: 40 }}
                  >
                    Sign In
                  </Button>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Divider plain>or</Divider>
              </Col>
              <Col span={24}>
                <Button
                  icon={<GoogleOutlined />}
                  block
                  onClick={handleGoogleLogin}
                  style={{
                    borderRadius: 8,
                    backgroundColor: '#fff',
                    color: '#000',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}
                >
                  Sign in with Google
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Col>
      {contextHolder}
    </Row>
  );
};

export default Login;
