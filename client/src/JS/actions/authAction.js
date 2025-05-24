//imports

import { AUTH_LOAD, CURRENT_AUTH, LOGOUT_AUTH, SUCCES_AUTH , FAIL_AUTH, CLEAR_ERRORS_AUTH, CLEAR_SUCCESS_AUTH} from "../actionTypes/authActionTypes"
import  axios from 'axios'




//mes fonctions qui retournent un objet : action(type, payload)

//action register
export const register = (newUser , navigate )=> async(dispatch ) => { //dispatch appele une action de l'actionType
    dispatch({type:AUTH_LOAD})
    try { 
        // console.log(newUser);
        const result = await axios.post("/api/auth/register" , newUser)  //travailler avec le back
        console.log(result);
        dispatch({type: SUCCES_AUTH, payload: result.data})
        navigate('/profile')
        //avec back msg+tocken
    } catch (error) {

        dispatch({type: FAIL_AUTH, payload: error.response.data.errors})
    }
}

export const login = (User , navigate) => async(dispatch) => {
    dispatch({type:AUTH_LOAD})
    try {
        const result = await axios.post("api/auth/login", User)
        dispatch({type: SUCCES_AUTH, payload: result.data})
        navigate('/profile')
    } catch (error) {
        dispatch({type: FAIL_AUTH, payload: error.response.data.errors})
        
    }
}


export const curent = () => async (dispatch) => {
    dispatch({ type: AUTH_LOAD });
  
    const token = localStorage.getItem("token");
  
    if (!token) {
      return dispatch({
        type: FAIL_AUTH,
        payload: [{ msg: "Aucun token fourni" }],
      });
    }
  
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`, // Assure-toi que le backend accepte "Bearer"
        },
      };
  
      const result = await axios.get("/api/auth/current", config);
      // Vérifie que result.data est défini avant d'accéder à result.data
      if (result && result.data) {
        dispatch({ type: CURRENT_AUTH, payload: result.data });
      } else {
        throw new Error("Aucune donnée renvoyée par le serveur.");
      }
    } catch (error) {
      // Vérifie l'existence de error.response et de error.response.data
      const errorMessage = error?.response?.data?.errors || [
        { msg: "Erreur serveur ou mauvaise réponse de l'API." },
      ];
      console.error("Erreur lors de la récupération des données actuelles :", error); // Affiche l'erreur dans la console pour un meilleur diagnostic
      dispatch({ type: FAIL_AUTH, payload: errorMessage });
    }
  };
  
  
  

export const logout = (navigate) => (dispatch) => {

    dispatch({type:LOGOUT_AUTH})
    navigate('/')
    
}


export const clearError = () => {
    return {
        type: CLEAR_ERRORS_AUTH
    }
}


export const clearSuccess = () => {
    return {
        type: CLEAR_SUCCESS_AUTH
    }
}
