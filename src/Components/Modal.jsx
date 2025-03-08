import { Modal, Typography, Row, Col, Button, Popconfirm } from 'antd';
import { removeData } from '../confing/realtimeCalls';
import { DeleteOutlined, EditFilled } from '@ant-design/icons';
import EditForm from './EditForm';
import { useState } from 'react';

export default function ArticleModal({
  modalVisible,
  setModalVisible,
  selectedArticle,
  localUser,
  setArticles,
  setSelectedArticle,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const deleteData = async () => {
    await removeData(
      `tasks/${selectedArticle.key}`,
      selectedArticle,
      localUser.permissions
    );
  };

  return (
    <Modal
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      footer={null}
      width='65vw'
      centered
      style={{ top: 0, padding: 0 }}
    >
      {selectedArticle && (
        <div style={{ padding: '20px' }}>
          <Typography.Title level={1}>{selectedArticle.title}</Typography.Title>
          <hr style={{ border: '1px solid #ddd' }} />
          <Row
            gutter={16}
            style={{
              minHeight: '65vh',
              maxHeight: '65vh',
              overflowY: 'auto',
            }}
          >
            <Col xs={16} sm={16} md={16} lg={16} xl={16}>
              <Typography.Title level={3}>Descripción</Typography.Title>
              <Typography.Paragraph>
                {selectedArticle.description}
              </Typography.Paragraph>
            </Col>
            <Col
              xs={8}
              sm={8}
              md={8}
              lg={8}
              xl={8}
              style={{
                borderLeft: '2px solid #ddd',
                paddingLeft: '16px',
              }}
            >
              <Typography.Title level={4}>Detalles</Typography.Title>
              <Typography.Text>
                <strong>Created by: </strong> {selectedArticle.user}
              </Typography.Text>
              <br />
              <Typography.Text>
                <strong>Assigned to: </strong> {selectedArticle.assignedTo}
              </Typography.Text>
              <br />
              <Typography.Text>
                <strong>Create at: </strong> {selectedArticle.startDate}
              </Typography.Text>
              <br />
              <Typography.Text>
                <strong>Create at: </strong> {selectedArticle.endDate}
              </Typography.Text>
            </Col>
          </Row>
          {(localUser.permissions === 'delete' ||
            localUser.permissions === 'admin') && (
            <Popconfirm
              title='¿Estás seguro de que quieres eliminar esta tarea?'
              onConfirm={deleteData}
              okText='Sí'
              cancelText='No'
            >
              <Button
                type='primary'
                danger
                icon={<DeleteOutlined />}
                size='large'
              >
                Delete
              </Button>
            </Popconfirm>
          )}
          {(localUser.permissions === 'write' ||
            localUser.permissions === 'admin') && (
            <>
              <div
                style={{
                  display: 'flex',
                  placeItems: 'center',
                }}
              >
                <Button
                  type='primary'
                  size='large'
                  icon={<EditFilled/>}
                  onClick={() => {
                    setIsModalVisible(false);
                    setIsModalVisible(true);
                  }}
                >
                  Update
                </Button>
              </div>
              <EditForm
                user={localUser}
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                setArticles={setArticles}
                data={selectedArticle}
                setSelectedArticle={setSelectedArticle}
              />
            </>
          )}{' '}
          {}
        </div>
      )}
    </Modal>
  );
}
