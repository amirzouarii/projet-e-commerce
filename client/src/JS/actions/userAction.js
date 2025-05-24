import axios from "axios"
import { DELETE_USER,  FAIL_USER, GET_ALL_USERS, GET_USER, LOAD_USER } from "../actionTypes/userActionTypes"


//avoir la liste de tout les utilisateurs
export const getUsers= () => async (dispatch) => {
    dispatch({ type: LOAD_USER})
    try {
        const config = {   //un objet 
            headers : {
                authorization:localStorage.getItem("token")
            }
        };
        const result = await axios.get("/api/user/allUsers", config) ; //config : pour verifier le token
        dispatch({
            type:GET_ALL_USERS,
             payload: result.data.listUsers,
        });
        console.log(result.data.listUsers);
    } catch (error) {
        dispatch({type : FAIL_USER, payload:error.response.data.errors})
    }

};


//get one user
export const getOneUser = (id) => async (dispatch) => {
    dispatch({ type: LOAD_USER})
    try {
        const config = {
            headers : {
                authorization: localStorage.getItem("token"),

            }
        }
        const result = await axios.get(`/api/user/${id}`, config);
        dispatch({
            type: GET_USER,
            payload: result.data.userToGet,
        })
    } catch (error) {
        dispatch({type : FAIL_USER, payload:error.response.data.errors})
    }
};

//suppression d'un user
export const deleteUser = (id) => async (dispatch) => {
    dispatch({type:LOAD_USER})
    try {
        const config = {
            headers :{
            authorization: localStorage.getItem("token")
        }};
        const result = await axios.delete(`/api/user/deletUser/${id}` , config);
        dispatch({
            type: DELETE_USER,
            payload: result.data.UserToDelete
        })
        console.log(result);
        dispatch(getUsers())

    } catch (error) {
        dispatch({type : FAIL_USER, payload:error.response.data.errors})
    }
}