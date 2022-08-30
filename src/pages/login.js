import { 
  Col, 
  Form, 
  Input, 
  Layout, 
  Row, 
  Card,
  Button 
} from 'antd';
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons';
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  Redirect
} from "react-router-dom";
import { authorize_api, client_id, redirect_uri, response_type, scope, state } from '../utils/constant';
import { useEffect, useMemo, useState } from 'react';
import { authService } from '../service/auth.api';


function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const LoginPage = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const query = useQuery();
  const auth_code = query.get('code');

  useEffect(() => {
    if(auth_code) {
      authService.login(auth_code).then(data => {
        localStorage.setItem('access_token', data.data.access_token)
        localStorage.setItem('refresh_token', data.data.refresh_token)
        localStorage.setItem('expires_in', data.data.expires_in)
        setIsAuth(true);
      })
    }
  }, [auth_code]);

  if(isAuth)
    return <Redirect
    to={{
      pathname: "/dashboard",
    }}
  />

  return (
    <>
      <Layout style={{
        height: '100vh'
      }}>
        <Row justify="center" style={{
          height: '100%'
        }} align="middle">
          <Col span={5}>
            <Card title="Login">
              <Form>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your username!',
                    },
                  ]}
                >
                  <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <Input.Password size="large" placeholder="large size" prefix={<LockOutlined />} />
                </Form.Item>
                <Button type="primary" block>
                  Login
                </Button>
                <Button type="primary" 
                  href={`${authorize_api}?response_type=${response_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&state=${state}&scope=${scope}`} 
                  style={{
                  background: '#52c41a',
                  marginTop: '5px'
                }} block>
                  Login with line
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

export default LoginPage;