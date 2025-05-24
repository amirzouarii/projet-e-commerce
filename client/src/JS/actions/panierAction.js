import axios from 'axios'
import { ADD_PANIER, FAIL_PANIER, GET_PANIER, LOAD_PANIER, VIDER_PANIER } from '../actionTypes/panierActionTypes'

export const getPanier = () => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });
  try {
    let config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.get('/api/panier/getPanier', config);
    dispatch({ type: GET_PANIER, payload: result.data });
  } catch (error) {
    dispatch({ type: FAIL_PANIER, payload: error.response?.data || error.message });
  }
};

export const addPanier = (productId, quantity = 1) => async (dispatch) => {
  dispatch({ type: LOAD_PANIER });

  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };

    const newPanier = { productId, quantity };
    const result = await axios.post('/api/panier/addPanier', newPanier, config);

    dispatch({ type: ADD_PANIER, payload: result.data });

    console.log("Produit ajouté au panier avec succès");
    return result.data; // ✅ on retourne les données ici
  } catch (error) {
    console.error("Erreur dans addPanier:", error);
    dispatch({ type: FAIL_PANIER, payload: error.response?.data || "Erreur" });

    throw error; // ✅ on relance l'erreur pour qu'elle soit captée dans le composant
  }
};



export const viderPanierBackend = () => async (dispatch) => {
  dispatch({type: LOAD_PANIER});
  try {
    const config = {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    };
    const result = await axios.delete('/api/panier/deleteP', config);
    console.log("Réponse vidage panier :", result.data);  // <-- Ajouté pour debug
    dispatch({ type: VIDER_PANIER, payload: result.data});
    dispatch(getPanier());
  } catch (err) {
    console.error('Erreur lors du vidage du panier', err);
  }
};



