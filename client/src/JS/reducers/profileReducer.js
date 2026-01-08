import { CREATE_PROFILE, FAIL_PROFILE, GET_PROFILE, LOAD_PROFILE, UPDATE_PROFILE } from "../actionTypes/profileActionTypes";

const initialState = {
  loading: false,
  profile: null,
  error: null,
};

const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_PROFILE:
      return { ...state, loading: true };
    case GET_PROFILE:
      return { ...state, loading: false, profile: payload };
    case CREATE_PROFILE:
      return { ...state, loading: false, profile: payload };
    case UPDATE_PROFILE:
      return { ...state, loading: false, profile: payload };
    case FAIL_PROFILE:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export default profileReducer;
