import { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, LogoutOutlined, MenuOutlined, UserOutlined } from '@ant-design/icons';
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
        TAREAS
      </div>
      <Menu
        theme='dark'
        mode='horizontal'
        style={{ flex: 1, minWidth: 0 }}
        selectedKeys={[]}
      >
        <Menu.Item key='1'>
          <Button theme='dark' onClick={() => navigate('/')}>
          <HomeOutlined /> Home Page
          </Button>
        </Menu.Item>
      </Menu>

      <Button type='primary' style={{color:'red', background:'white', borderColor:'#E5B4B4',
        borderBlockStyle:'solid'
      }}
      
      icon={<LogoutOutlined />} onClick={logout}
      >
        <p>{localUser.name}</p>
      </Button>
    </Header>
  );
}
