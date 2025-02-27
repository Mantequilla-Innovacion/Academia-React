import { Button, Col, Input, Row } from 'antd';
import React, { useState } from 'react'
import { signinUser } from './confing/authCall';

export default function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

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
