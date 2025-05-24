import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneProd } from '../JS/actions/productAction';
import Spinner from 'react-bootstrap/Spinner';
import { addPanier } from '../JS/actions/panierAction';

const DetailProd = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { prod: product, loadP } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(getOneProd(id));
  }, [id, dispatch]);


const handleAddToCart = async () => {
  try {
    console.log("handleAddToCart called");
    const response = await dispatch(addPanier(product._id, 1));
    console.log("Réponse addPanier:", response);
    alert("Produit ajouté au panier !");
  } catch (err) {
    console.error("Erreur lors de l'ajout du produit au panier :", err);
    alert("Erreur lors de l'ajout du produit.");
  }
};



  

  if (loadP) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner animation="border" variant="primary" />
        <p>Chargement du produit...</p>
      </div>
    );
  }

  
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
      <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>{product.title}</h2>
      <div style={{ textAlign: 'center' }}>
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: '100%', height: 'auto', borderRadius: '10px' }}
        />
      </div>
      <p style={{ marginTop: '20px' }}>
        <strong>Description :</strong><br /> {product.description}
      </p>
      <p>
        <strong>Prix :</strong> {product.price} €
      </p>

       <button  onClick={handleAddToCart}>
        🛒 Ajouter au panier
      </button>
    </div>
  );
};

export default DetailProd;
