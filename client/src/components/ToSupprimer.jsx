import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deleteUser } from '../JS/actions/userAction';

const ToSupprimer = ({show , handleClose , userId }) => {
    const dispatch = useDispatch();
    const handleDelete =() =>{
        dispatch(deleteUser(userId));
        handleClose();
    }
  return (
    
    <div>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Supprimer</Modal.Title>
        </Modal.Header>
       Ete vous sur de le supprimer 
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ToSupprimer