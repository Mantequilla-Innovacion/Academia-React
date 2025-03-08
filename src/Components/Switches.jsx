import React, { useState, useEffect } from 'react';
import { readData, writeData } from '../confing/realtimeCalls';
import { Button } from 'antd';
import { useAuth } from '../hooks/useAuth';

export default function Switches() {
  const { user } = useAuth();
  const [localUser, setLocalUser] = useState(null);
  
  const[title, setTitle] = useState('');
  const[bool, setBool] = useState(false)

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

  const saveData = async () => {
    if (!user || !user.name) {
      console.log('There is no user.');
      return;
    }

    if (!title.trim() || !assignedUser || !dateRange[0] || !dateRange[1]) {
      console.log('Title, assigned user, star date and finish date are requier');
      return;
    }
    const newArticle = {
      title: title.trim(),
      bool: false,
    };
    await writeData('tasks', newArticle, user.permissions);
    setArticles((prevArticles) => [...prevArticles, newArticle]);
    setDateRange([dayjs(), null]);
  };

  return (
    <div>
      a
    </div>
  );
}
