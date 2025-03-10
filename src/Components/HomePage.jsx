import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { readData } from '../confing/realtimeCalls';
import Forms from './Form';
import Articles from './Articles';
import Navbar from './Navbar';
import { Button } from 'antd';

export default function Home() {
  const [localUser, setLocalUser] = useState(null);
  const { user } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [data, setData] = useState(false);

  useEffect(() => {
    readUser();
  }, [user]);

  const readUser = async () => {
    const luser = await readData('users', 'email', user.email);
    if (luser.val()) {
      const userKey = Object.keys(luser.val())[0];
      const userData = luser.val()[userKey];
      setLocalUser({ ...userData, id: String(userKey) });
    }
  };

  useEffect(() => {
    initializeArticles();
  }, []);

  const initializeArticles = async () => {
    setArticles([]);
    const data = await readData('tasks');

    if (data) {
      const object = Object.entries(data).map(([key, value]) => ({
        key,
        ...value,
      }));
      setArticles(object);
      setData(true);
    } else {
      setData(false);
    }
  };

  return (
    <span style={{ textAlign: 'right' }}>
      {localUser && (
        <>
          <Navbar localUser={localUser} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <div>
              <h1 style={{ width: '20hv' }}>tasks</h1>
            </div>
            {(localUser?.permissions === 'write' ||
              localUser?.permissions === 'admin') && (
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
                    onClick={() => setIsModalVisible(true)}
                  >
                    New Task
                  </Button>
                </div>
                <Forms
                  user={localUser}
                  isVisible={isModalVisible}
                  onClose={() => setIsModalVisible(false)}
                  setArticles={setArticles}
                />
              </>
            )}{' '}
            {}
          </div>
          <hr></hr>

          {localUser && (
            <Articles
              localUser={localUser}
              articles={articles}
              data={data}
              setArticles={setArticles}
            />
          )}
        </>
      )}
    </span>
  );
}
