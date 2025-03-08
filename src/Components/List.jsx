import React from 'react';
import { List, Card, Typography, Pagination } from 'antd';

export default function ArticleList({
  articles,
  currentPage,
  setCurrentPage,
  pageSize,
  openModal,
  data,
}) {
  const first = (currentPage - 1) * pageSize;
  const last = first + pageSize;
  const pagArticles = articles.slice(first, last);

  return (
    <div style={{ padding: '20px' }}>
      {data ? (
        <>
          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={pagArticles}
            renderItem={(task) => (
              <List.Item>
                <Card
                  title={task.title}
                  hoverable
                  onClick={() => openModal(task)}
                  style={{
                    background: '#Af9f9f9',
                    transition: 'transform 0.2s ease-in-out',
                    height: '250px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = 'scale(1.05)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = 'scale(1)')
                  }
                >
                  <div style={{ flex: 1 }}>
                    <Typography.Paragraph
                      ellipsis={{ rows: 5, expandable: false }}
                    >
                      <strong>Descripción:</strong> {task.description}
                    </Typography.Paragraph>
                  </div>
                  <div>
                    <Typography.Text type='secondary'>
                      <strong>Creado por:</strong> {task.user}
                    </Typography.Text>
                    <br />
                    <Typography.Text type='secondary'>
                      <strong>Asignado a:</strong> {task.assignedTo}
                    </Typography.Text>
                  </div>
                </Card>
              </List.Item>
            )}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={articles.length}
            onChange={(page) => setCurrentPage(page)}
            centered
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          />
        </>
      ) : (
        <Typography.Title
          level={3}
          style={{ textAlign: 'center', color: '#888' }}
        >
          No hay datos disponibles
        </Typography.Title>
      )}
    </div>
  );
}
