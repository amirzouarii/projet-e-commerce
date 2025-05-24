import axios from 'axios'
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, FAIL_PRODUCTS, GET_MY_PRODUCT, GET_ONE_PRODUCT, GET_PRODUCTS, LOAD_PRODUCT } from '../actionTypes/productActionTypes'



export const getAllProd = () =>async (dispatch) =>{

    dispatch({type:LOAD_PRODUCT})

    try {
        const result = await axios.get("/api/product/getAllProd");
        dispatch ({type:GET_PRODUCTS, payload: result.data.listProduct})
    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})
    }
};


//ajout
export const addProduct = (newProd) => async (dispatch) => {
    dispatch({type: LOAD_PRODUCT})
    try {
        let config = {
            headers:{
                authorization : localStorage.getItem("token")
            }
        }
        const result = await axios.post('/api/product/addProd' , newProd , config);
        dispatch({type: ADD_PRODUCT , payload: result.data})
        dispatch(getMyProd())
    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})
    }
} 

//detail d'un produit bien precis
export const getOneProd =(id) =>async(dispatch)  => {
    dispatch({type:LOAD_PRODUCT})
    try {
        const result = await axios.get(`/api/product/${id}`)
        dispatch({type:GET_ONE_PRODUCT, payload:result.data})
    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})
    }

}

//avoir mes produits
export const getMyProd =() => async(dispatch) => {
    dispatch({type:LOAD_PRODUCT})
    try {
        let config = {
            headers: {
                authorization: localStorage.getItem("token")
            },
        }
        const result = await axios.get('/api/product/myProd' , config);
        dispatch({type:GET_MY_PRODUCT, payload: result.data })
        dispatch(getAllProd());
    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})

    }
}


export const editProd = (id, prodToEdit) =>async(dispatch) =>{
    dispatch({type: LOAD_PRODUCT})
    try {
        let config ={
            headers: {
                authorization: localStorage.getItem("token"),
            }
        };
        const result = await axios.put(`/api/product/${id}` , prodToEdit , config);
        dispatch({type:EDIT_PRODUCT , payload:result.data})
        dispatch(getMyProd())
    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})

    }

}


export const delProd = (id) =>async(dispatch)=> {
    dispatch({type: LOAD_PRODUCT})
    try {
        let config={
            headers:{
                authorization: localStorage.getItem("token"),
            },
        };
        const result = await axios.delete(`/api/product/${id}` , config);
        dispatch({type:DELETE_PRODUCT , payload: result.data});
        dispatch(getMyProd())

    } catch (error) {
        dispatch({type:FAIL_PRODUCTS, payload:error.response.data})

    }
}