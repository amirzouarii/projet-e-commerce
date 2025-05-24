import { combineReducers } from 'redux'
import authReducer from "./authReducer"
import userReducer from './userReducer';
import productReducer from './productReducer';
import panierReducer from './panierReducer';

const rootReducer = combineReducers({ authReducer , userReducer , productReducer , panierReducer}); //si on a beaucoup on les combines pour les envoyer au store

export default rootReducer
