import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signinUser } from '../confing/authCall';

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/home');
  }, [user, navigate]);

  const onFinish = async (values) => {
    try {
      const response = await signinUser(values.mail, values.password);
      if (response.error) {
        alert(
          'Titulo, persona designada y fecha de finalización son obligatorios'
        );
        return;
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Form
      name='login_form'
      onFinish={onFinish}
      style={{ maxWidth: 300, margin: 'auto' }}
    >
      <h2>Login</h2>

      <Form.Item
        label='Email'
        name='mail'
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Password'
        name='password'
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          Submit
        </Button>
      </Form.Item>

      <hr></hr>

      <Form.Item>
        <Button type='link' onClick={() => navigate('/signup')}>
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
}
