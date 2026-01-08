import { ADD_CATEGORY, FAIL_CATEGORIES, GET_CATEGORIES, LOAD_CATEGORIES } from "../actionTypes/categoryActionTypes";

const initialState = {
  loadC: false,
  categories: [],
  error: null,
};

const categoryReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_CATEGORIES:
      return { ...state, loadC: true };

    case GET_CATEGORIES:
      return { ...state, loadC: false, categories: payload };

    case ADD_CATEGORY:
      return { ...state, loadC: false };

    case FAIL_CATEGORIES:
      return { ...state, loadC: false, error: payload };

    default:
      return state;
  }
};

export default categoryReducer;
