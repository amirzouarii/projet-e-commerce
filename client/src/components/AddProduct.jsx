import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../JS/actions/productAction';
import { getCategories } from '../JS/actions/categoryAction';

function AddProduct() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  // Liste des marques possibles
  const brandsList = ["Samsung", "Apple", "Xiaomi", "Huawei", "OnePlus"];

  // Ajout du champ brand dans l'état
  const { categories } = useSelector((state) => state.categoryReducer);

  const [newProd, setNewProd] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    brand: brandsList[0],  // valeur par défaut à la première marque
    category: "", // category id
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // si des categories existent, mettre la première comme valeur par défaut
  useEffect(() => {
    if (categories && categories.length > 0 && !newProd.category) {
      setNewProd((prev) => ({ ...prev, category: categories[0]._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

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
    category: "",
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

              <Form.Label>Catégorie :</Form.Label>
              <Form.Select
                name="category"
                value={newProd.category}
                onChange={handleChange}
              >
                {(categories || []).map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
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
