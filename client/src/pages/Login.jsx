import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../JS/actions/authAction'

const Login = () => {
  const [user, setUser] =useState({
    email: "", password: ""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleChange = (e) => {
    setUser({...user,[e.target.name]:e.target.value})
  }
  // console.log(user);
  const handleLogin = (e) => {
  e.preventDefault()
  dispatch(login(user, navigate))
  }
  return (
    <div>
        <Form onSubmit={handleLogin}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={user.email} onChange={handleChange} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={user.password} onChange={handleChange}/>
      </Form.Group>

       <p>Si vous n'avez pas un compte veuillez {" "}  {/*  un espace */}
        <a href="/register">register</a>
      </p>
      <Button variant="primary" type="submit">
        Login
      </Button>

    </Form>
    </div>
  )
}

export default Login