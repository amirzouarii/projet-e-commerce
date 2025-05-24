//import 

import { FAIL_AUTH } from "../actionTypes/authActionTypes";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_MY_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from "../actionTypes/productActionTypes";


//initialisation
const initialState ={
    loadP :false,
    products : [],
    myProduct: [],
    prod:{},
    success:false,
    error: null

};


//pure fonction


const productReducer = ( state =initialState , {type, payload}) => {
    switch (type) {
        case LOAD_PRODUCT: return {...state, loadP:true};
        case GET_PRODUCTS: return {...state, loadP:false, products:payload , success:true};
        case GET_ONE_PRODUCT: return{...state, loadP:false, prod: payload.ProdToGet, success:true};
        case GET_MY_PRODUCT: return{...state, loadP:false, myProduct:payload.myProdList, success:true};
        case ADD_PRODUCT: return {...state, loadP:false, products: [...state.products, payload.newProd]};
        case EDIT_PRODUCT: return {...state, loadP:false, products:state.products.map((prod) => prod.id === payload.id?
             {...prod, ...payload.prodToEdit}: prod)};
        case DELETE_PRODUCT: return {...state, loadP:false , products: state.products.filter(prod => prod._id !== payload.id), success:true};
        case FAIL_AUTH: return {...state, loadP:false, error: payload , success:false };
            
            
    
        default:
           return state;
    }

}






export default productReducer