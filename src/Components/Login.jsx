import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signinUser } from '../confing/authCall';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await signinUser(values.mail, values.password);
      if (response.error) {
        alert(
          'Email and password are required'
        );
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", display: "flex", justifyContent: "center", padding:"35px" }}>
      <Form
        name="login_form"
        onFinish={onFinish}
        style={{ maxWidth: 300, borderRadius: "8px" }}
      >
        <h2 style={{ color: "black" }}>Login</h2>
  
        <Form.Item
          label="Email"
          name="mail"
          rules={[{ required: true, message: "Please enter your username!" }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter your password!" }]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item>
          <Button type="primary" htmlType="submit" block color='green' variant='solid'>
            Submit
          </Button>
        </Form.Item>
  
        <hr />
  
        <Form.Item>
          <Button type="link" onClick={() => navigate("/signup")}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
  
}
