import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { addProduct } from '../JS/actions/productAction';

function AddProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // Liste des marques possibles
  const brandsList = ["Samsung", "Apple", "Xiaomi", "Huawei", "OnePlus"];

  // Ajout du champ brand dans l'état
  const [newProd, setNewProd] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: brandsList[0],  // valeur par défaut à la première marque
  });

  const handleChange = (e) => {
    setNewProd({ ...newProd, [e.target.name]: e.target.value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    dispatch(addProduct(newProd));
    handleClose();
    setNewProd({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: "", 
  });
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Ajouter un produit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter votre produit</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Titre :</Form.Label>
              <Form.Control
                type="text"
                placeholder="titre"
                name="title"
                value={newProd.title}
                onChange={handleChange}
              />

              <Form.Label>Description :</Form.Label>
              <Form.Control
                type="text"
                placeholder="desc"
                name="description"
                value={newProd.description}
                onChange={handleChange}
              />

              <Form.Label>Prix :</Form.Label>
              <Form.Control
                type="text"
                placeholder="price"
                name="price"
                value={newProd.price}
                onChange={handleChange}
              />

              <Form.Label>URL Image :</Form.Label>
              <Form.Control
                type="text"
                placeholder="img"
                name="image"
                value={newProd.image}
                onChange={handleChange}
              />

              <Form.Label>Marque :</Form.Label>
              <Form.Select
                name="brand"
                value={newProd.brand}
                onChange={handleChange}
              >
                {brandsList.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddProduct;
