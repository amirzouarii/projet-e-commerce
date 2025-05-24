import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import {  useSelector } from 'react-redux'
// import { getOneUser } from '../JS/actions/userAction';

const UserDetails = ({show , handleClose , userId }) => {
    // const dispatch = useDispatch();
    const {user, isLoad}=useSelector(state=>state.userReducer)
    // useEffect(() => {
        
    //     dispatch(getOneUser(userId))
    // }, [dispatch, userId]);
  return (
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details de l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {user && !isLoad &&(
            <div>
                <p>nom: {user.name}</p>
                <p>email : {user.email}</p>
                <p>phone : {user.phone}</p>
                <p>depuis : {user.
createdAt}</p>
                <p>id : {user._id}</p>
            </div>
        )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default UserDetails