import { Button, Col, Input, Row } from 'antd';
import React, { use, useState } from 'react'
import { useEffect } from 'react';
import { signinUser } from '../confing/authCall';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function Login({mail}) {
    const {user} = useAuth();
    const [userName, setUserName] = useState(mail);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    useEffect(() => {
      if (user) navigate('/navbar');  
    }, [user]);
      

    const changeName=(inputvalue)=>{
        setUserName(inputvalue.target.value);
    }

    const changePassword=(inputvalue)=>{
        setPassword(inputvalue.target.value);
    }

    const login=()=>{
        signinUser(userName, password);
    }

  return (
    <div>
        <>{JSON.stringify(user)}</>
        <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Input 
                    size="small" 
                    placeholder='Correo del usuario' 
                    value={userName}
                    onChange={changeName}
                >
                </Input>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <Input.Password
                    size="small" 
                    placeholder='Correo del usuario' 
                    value={password}
                    onChange={changePassword}
                >
                </Input.Password>
            </Col>
        </Row>

    <Button onClick={login}>Login</Button>
    </div>
  )
}
