import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const { Header } = Layout;

export default function Navbar({ localUser }) {
  const navigate = useNavigate();

  const { logout } = useAuth();
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#001529',
        padding: '0 20px 0 50px',
      }}
    >
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>
        LoremIpsum
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ flex: 1, minWidth: 0 }}
        selectedKeys={[]}
      >
        <Menu.Item key='1'>
          <Button theme='dark' onClick={() => navigate('/home')}>
            Home Page
          </Button>
        </Menu.Item>
        <Menu.Item key='2'>
          <Button onClick={() => navigate('/switches')}>Home Page</Button>
        </Menu.Item>
        <Menu.Item key='3'>
          <Button onClick={() => navigate('/Home')}>Home Page</Button>
        </Menu.Item>
      </Menu>

      <Button type='primary' icon={<LogoutOutlined />} onClick={logout}>
        <p>{localUser.name}</p>
      </Button>
    </Header>
  );
}
