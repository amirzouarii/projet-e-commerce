import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { editProd } from '../JS/actions/productAction';

function EditProduct({product}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //************** *
  const dispatch = useDispatch()
  const [ProdToEdit, setProdToEdit] = useState({
      title: product.title,
      description: product.description,
      image:product.image,
      price:product.price,
  });

  const handleChange= (e) => {
    setProdToEdit({...ProdToEdit, [e.target.name]: e.target.value })
}


 const handleEditProd= (e) =>{
    e.preventDefault();
    dispatch(editProd(product._id , ProdToEdit));
    handleClose();

 }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Editer Produit 
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editer</Modal.Title>
        </Modal.Header>
       
        <Modal.Body>
        <Form>
      <Form.Group className="mb-3" >
        <Form.Label>Titre :</Form.Label>
        <Form.Control type="text" placeholder="titre" name='title' value={ProdToEdit.title} onChange={handleChange}/>
        <Form.Label>description</Form.Label>
        <Form.Control type="text" placeholder="desc"   name='description' value={ProdToEdit.description} onChange={handleChange}/>
        <Form.Label>prix</Form.Label>
        <Form.Control type="text" placeholder="price"  name='price' value={ProdToEdit.price} onChange={handleChange} />
        <Form.Label>URL Image :</Form.Label>
        <Form.Control type="text" placeholder="img"  name='image' value={ProdToEdit.image} onChange={handleChange} />
        
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditProd} >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProduct;