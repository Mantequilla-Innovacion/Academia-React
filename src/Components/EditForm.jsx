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
import { updateData, readData } from '../confing/realtimeCalls';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const { Title } = Typography;

export default function EditForm({
  user,
  isVisible,
  onClose,
  setArticles,
  data,
  setSelectedArticle,
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateRange, setDateRange] = useState([]);
  const [assignedUser, setAssignedUser] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setTitle(data.title || '');
      setDescription(data.description || '');
      setDateRange([
        data.startDate ? dayjs(data.startDate, 'YYYY-MM-DD HH:mm:ss') : null,
        data.endDate ? dayjs(data.endDate, 'YYYY-MM-DD HH:mm:ss') : null,
      ]);
      setAssignedUser(data.assignedTo || '');
    }
  }, [data]);

  useEffect(() => {
    const fetchUsers = async () => {
      const userData = await readData('users');
      if (userData) {
        const userList = Object.values(userData).map((user) => ({
          value: user.name,
          label: user.name,
        }));
        setUsers(userList);
      }
    };
    fetchUsers();
  }, []);

  const editData = async () => {
    if (!user || !user.name) {
      console.log('There is no user.');
      return;
    }

    if (!title.trim() || !assignedUser || !dateRange[0] || !dateRange[1]) {
      console.log(
        'Título, persona designada y rango de fechas son obligatorios'
      );
      return;
    }

    const newArticle = {
      title: title.trim(),
      description: description.trim() || 'Sin descripción',
      assignedTo: assignedUser,
      startDate: dateRange[0].format('YYYY-MM-DD HH:mm:ss'),
      endDate: dateRange[1].format('YYYY-MM-DD HH:mm:ss'),
    };

    await updateData(`tasks/${data.key}`, newArticle, user.permissions);

    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.key === data.key ? newArticle : article
      )
    );

    setSelectedArticle(newArticle);

    onClose();
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
        <Title level={3}>Edit Task</Title>
      </div>
      <Form layout='vertical' style={{ maxWidth: 400, margin: 'auto' }}>
        <Form.Item label='Title'>
          <Input
            size='large'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item label='Description'>
          <Input.TextArea
            size='large'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <Form.Item label='Start Date - Finalization Date'>
          <RangePicker
            showTime
            format='YYYY-MM-DD HH:mm:ss'
            value={dateRange}
            onChange={(dates) => setDateRange(dates)}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label='Assigned User'>
          <Select
            size='large'
            value={assignedUser}
            onChange={(value) => setAssignedUser(value)}
            options={users}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type='primary' size='large' block onClick={editData}>
            Save Task
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
