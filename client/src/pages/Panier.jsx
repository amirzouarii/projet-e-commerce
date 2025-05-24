import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPanier ,viderPanier, viderPanierBackend} from '../JS/actions/panierAction';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


  

const Panier = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const panier = useSelector((state) => state.panierReducer.panier);
  const loading = useSelector((state) => state.panierReducer.loadP);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  useEffect(() => {
    dispatch(getPanier());
  }, [dispatch]);

  

  if (loading) return <p>Chargement du panier...</p>;
  if (!panier || !panier.items || panier.items.length === 0) return <p>Le panier est vide.</p>;

  // Ne garder que les items avec un productId valide
  const validItems = panier.items.filter(item => item.productId !== null);

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Mon Panier</h2>
      {validItems.map(({ productId, quantity }) => (
        <div
          key={productId._id}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 15,
            borderBottom: '1px solid #ccc',
            paddingBottom: 10,
          }}
        >
          <img
            src={productId.image}
            alt={productId.title}
            style={{ width: 80, height: 80, objectFit: 'cover', marginRight: 20 }}
          />
          <div style={{ flexGrow: 1 }}>
            <h3 style={{ margin: 0 }}>{productId.title}</h3>
            <p style={{ margin: '5px 0' }}>{productId.description}</p>
            <p>Prix unitaire : {productId.price} €</p>
            <p>Quantité : {quantity}</p>
            <p>
              <strong>Total : {productId.price * quantity} €</strong>
            </p>
          </div>
        </div>
      ))}
      <h3>
        Total général :{' '}
        {validItems.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0
        )}{' '}
        €
      </h3>


         <>
      <Button variant="success" className='mt-4' onClick={handleShow}>
        Confirmer mon panier
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmer mon panier</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Control type="Text" placeholder="Veillez confirmer votre numero" />
           <Form.Text className="text-black">
          Un de notre equipe vas vous contacter dans les prochaine 24h
        </Form.Text>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
  variant="primary"
  onClick={() => {
    navigate('/')
    handleClose();
  }} >
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    </div>
  );
};

export default Panier;
