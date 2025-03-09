import { Button, Input, Form } from 'antd';
import React, { useEffect } from 'react';
import { signupUser } from '../confing/authCall';
import { writeData } from '../confing/realtimeCalls';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const onFinish = async (values) => {
    try {
      const email = values.email;
      const name = values.name;
      const response = await signupUser(values.email, values.password);
      // const cleanEmail = email.replace(/[^a-zA-Z0-9]/g, '_');
      const { user, error } = response;

      if (user) {
        await writeData(
          `users/`,
          { email, name, persmissions: 'read' },
          'admin'
        );
        console.log('User created:', user);
      } else {
        console.log('Error:', error);
      }
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <Form
        name='login_form'
        onFinish={onFinish}
        style={{ maxWidth: 300, margin: 'auto' }}
      >
        <h2>Login</h2>

        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please enter your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Name'
          name='name'
          rules={[{ required: true, message: 'Please enter your name!' }]}
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
          <Button type='link' onClick={() => navigate('/login')}>
            Signup
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
