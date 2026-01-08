import { combineReducers } from 'redux'
import authReducer from "./authReducer"
import userReducer from './userReducer';
import productReducer from './productReducer';
import panierReducer from './panierReducer';
import categoryReducer from './categoryReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({ authReducer , userReducer , productReducer , panierReducer, categoryReducer, profileReducer}); //si on a beaucoup on les combines pour les envoyer au store

export default rootReducer
