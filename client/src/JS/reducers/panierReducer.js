import { ADD_PANIER, FAIL_PANIER, GET_PANIER, LOAD_PANIER, VIDER_PANIER } from "../actionTypes/panierActionTypes";

const initialState = {
  loadP: false,
  panier: null, // panier est un objet (avec items, etc.)
  error: null
};

const panierReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PANIER:
      return { ...state, loadP: true };

    case GET_PANIER:
      return { ...state, loadP: false, panier: payload };

    case ADD_PANIER:
         console.log("ADD_PANIER payload:", payload);
      return { ...state, loadP: false, panier: payload };

    case VIDER_PANIER:
  return {
    ...state,
    panier: {
      ...(state.panier || {}),
      items: [],
    },
  };



    case FAIL_PANIER:
      return { ...state, loadP: false, error: payload };

    default:
      return state;
  }
};

export default panierReducer;
