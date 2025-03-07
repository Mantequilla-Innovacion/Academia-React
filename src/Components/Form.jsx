import React, { useState, useEffect } from 'react';
import {
  Button,
  Input,
  DatePicker,
  Select,
  Modal,
  Form,
  Typography,
} from 'antd';
import { writeData, readData } from '../confing/realtimeCalls';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function Forms({ user, isVisible, onClose, setArticles }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateRange, setDateRange] = useState([dayjs(), null]);
  const [assignedUser, setAssignedUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await readData('users');
      if (data) {
        const userList = Object.values(data).map((user) => ({
          value: user.name,
          label: user.name,
        }));
        setUsers(userList);
      }
    };
    fetchUsers();
  }, []);

  const saveData = async () => {
    if (!user || !user.name) {
      console.log('There is no user.');
      return;
    }

    if (!title.trim() || !assignedUser || !dateRange[0] || !dateRange[1]) {
      console.log(
        'Title, assigned user, star date and finish date '
      );
      return;
    }
    const newArticle = {
      title: title.trim(),
      description: description.trim() || 'Sin descripción',
      user: user.name,
      assignedTo: assignedUser,
      startDate: dateRange[0].format('YYYY-MM-DD HH:mm:ss'),
      endDate: dateRange[1].format('YYYY-MM-DD HH:mm:ss'),
    };
    await writeData('tasks', newArticle, user.permissions);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    onClose();
    setTitle('');
    setDescription('');
    setAssignedUser('');
    setDateRange([dayjs(), null]);
  };

  return (
    <Modal
      title={null}
      open={isVisible}
      onCancel={onClose}
      footer={null}
      centered
    >
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Title level={3}>Create a New Task</Title>
      </div>
      <Form layout='vertical' style={{ maxWidth: 400, margin: 'auto' }}>
        <Form.Item
          label='Título'
          rules={[{ required: true, message: 'Por favor ingresa el título' }]}
        >
          <Input
            size='large'
            placeholder='Escribe el título de la tarea'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Descripción'>
          <Input.TextArea
            size='large'
            placeholder='Describe la tarea'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item label='Fecha de Inicio - Finalización'>
          <RangePicker
            showTime
            format='YYYY-MM-DD HH:mm:ss'
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label='Persona designada'>
          <Select
            size='large'
            placeholder='Selecciona una persona'
            value={assignedUser}
            onChange={(value) => setAssignedUser(value)}
            options={users}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' size='large' block onClick={saveData}>
            Guardar Tarea
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
