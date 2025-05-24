import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../JS/actions/authAction'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const Register = () => {
  //useState pour recuperer le newUser
  const [newUser, setNewUser] =useState({
    name:"",email:"",password:"",phone:""
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoad = useSelector((state) => state.authReducer.isLoad)
  const handleChange = (e) => {
    setNewUser({...newUser,[e.target.name]:e.target.value})
  }
  // console.log(newUser);


  const handleRegister = (e) => {
    e.preventDefault() //arreter le chargement
    dispatch(register(newUser , navigate))
  }
  return (
    <div>
      {isLoad && <Loading />}
        <Form onSubmit={handleRegister}>

      <Form.Group className="mb-3" >
        <Form.Label>nom</Form.Label>
        <Form.Control type="text" placeholder="Entrer votre nom" name='name' value={newUser.name} onChange={handleChange}/>
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' value={newUser.email} onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={newUser.password} onChange={handleChange} />
      </Form.Group>
      
      <Form.Group className="mb-3" >
        <Form.Label>numero</Form.Label>
        <Form.Control type="tel" placeholder="Entrer votre numero" name='phone' value={newUser.phone} onChange={handleChange} />
      </Form.Group>

        <p>Si vous avez un compte {" "} 
            <a href="/login">Login</a>
        </p>
      <Button variant="primary" type="submit">
        Confirmer
      </Button>
    </Form>
    </div>
  )
}

export default Register