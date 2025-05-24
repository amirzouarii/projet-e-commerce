//import

import { DELETE_USER, FAIL_USER, GET_ALL_USERS, GET_USER, LOAD_USER } from "../actionTypes/userActionTypes";




//initialisation
const initialState = {
    listUsers: [],
    user: {},
    isLoad: false,
    errors: [],
    succes: [],
}



//pure fonction 

const userReducer = (state=initialState, {type,payload }) => {
    switch(type){
        case  LOAD_USER : return {...state, isLoad:true};

        case GET_ALL_USERS : return{...state, isLoad: false,listUsers:payload , succes: payload.succes};
        case GET_USER : return {...state, isLoad:false, user:payload, succes: payload.succes};
        case DELETE_USER :
         const newlist =state.listUsers.filter(el =>el._id !== payload._id)
         return{...state, isLoad:false , listUsers: newlist , succes:payload.succes };

         
        case FAIL_USER : return{...state, isLoad:false, errors:payload};
        default: return state;

    }
}

export default userReducer;