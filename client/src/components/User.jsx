import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import UserDetails from './UserDetails'
import ToSupprimer from './ToSupprimer'
import { useDispatch } from 'react-redux'
import { getOneUser } from '../JS/actions/userAction';

const User = ( {user }) => {
  const [details, setDetails]=useState(false)
  const [supprimer, setSupprimer]=useState(false)
  const dispatch = useDispatch()
  return (
    <div>
       <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title> {user.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user.email}</Card.Subtitle>
        <Card.Text>
          {user.phone}
        </Card.Text>
        <Button variant="secondary" onClick={() => {
          setDetails(true);
          dispatch(getOneUser(user._id))
        }}>Details</Button>

        <Button variant='danger' onClick={() => {
          setSupprimer(true)
        }}>
          Supprimer
        </Button>

      </Card.Body>
      
    </Card>
    <UserDetails  show={details}  handleClose={()=> setDetails(false) }   userId ={user._id} />
    
    <ToSupprimer show={supprimer} handleClose={()=> setSupprimer(false)}   userId={user._id} />

    
    </div>
  )
}

export default User