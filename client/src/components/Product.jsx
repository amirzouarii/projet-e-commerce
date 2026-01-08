import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delProd } from '../JS/actions/productAction';
import EditProduct from './EditProduct';

const cardStyle = {
  width: '100%',
  minHeight: '400px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const Product = ({ product, all }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    alert('suppression ');
    dispatch(delProd(product._id));
  };

  return (
    <Card style={cardStyle}>
      <Card.Img
        variant="top"
        src={product.image}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <p>Marque :  {product.brand}</p>
            <p>Catégorie : {product.category?.name || (product.category || '—')}</p>
            <strong>Prix :</strong> {product.price} €

          </Card.Text>

        </div>

        <div style={{ marginTop: 'auto' }}>
          {all ? (
            <Link to={`/prod/${product._id}`}>
              <Button variant="primary" className="w-100">Voir les détails</Button>
            </Link>
          ) : (
            <>
              <EditProduct product={product} />
              <Button variant="danger" className="w-100 mt-2" onClick={handleDelete}>
                Supprimer
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Product;
