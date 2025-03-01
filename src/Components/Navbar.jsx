import { Button } from 'antd'
import React from 'react'
import { useAuth } from '../hooks/useAuth'

export default function Navbar() {
    const {logout} = useAuth();
  return (
    <div style={{ textAlign: "right"}}>
        <Button onClick={logout}>
            LogOut
        </Button>
    </div>
  )
}
