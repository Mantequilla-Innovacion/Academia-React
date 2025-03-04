import React, { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { LogoutOutlined } from '@ant-design/icons'
import { readData } from '../confing/realtimeCalls';

export default function Navbar() {
    const {logout , user} = useAuth();
    const [localUser, setLocalUser] = useState(null);

    useEffect(() => {
      readUser();
    }, [user]);

    const readUser = async () => {
      const luser = await readData('users', 'email', user.email);
      if(luser.val()) {
        setLocalUser(luser.val()[Object.keys(luser.val())[0]]);
      }
    };

  return (
    <div style={{ textAlign: "right"}}>
      {localUser&&<>{localUser.name}</>}
      <LogoutOutlined onClick={logout}/>   
    </div>
  )
}