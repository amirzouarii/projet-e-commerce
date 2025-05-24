import { createStore, compose, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
 import rootReducer from "../reducers/index"
//ne pas copier

// et seulement après, le reste du code
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer,//ne pas copier
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
