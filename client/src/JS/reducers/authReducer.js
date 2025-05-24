//import

const { AUTH_LOAD, SUCCES_AUTH, FAIL_AUTH, CURRENT_AUTH, LOGOUT_AUTH, CLEAR_SUCCESS_AUTH, CLEAR_ERRORS_AUTH } = require("../actionTypes/authActionTypes");



//init
const initialState = {
    isLoad : false,
    user : {},
    errors : [],
    isAuth : false,
    success : [],
};



//pure function elle ne 
const authReducer = (state = initialState, {type, payload }) => {
    switch (type) {
        case AUTH_LOAD : return {...state, isLoad: true};

        case SUCCES_AUTH :
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                isLoad: false,
                user: payload.user,
                success: payload.success,
                isAuth: true
            }

        case FAIL_AUTH :
            return {
                ...state,
                isLoad:false,
                errors:payload
            }

        case CURRENT_AUTH:
            return {
                ...state,
                isLoad:false,
                user:payload,
                isAuth:true,
            }

        case LOGOUT_AUTH:
            localStorage.removeItem("token")
            return{
                ...state,
                isLoad : false,
                user : {},
                errors : [],
                isAuth : false,
                success: []
            };

        case CLEAR_SUCCESS_AUTH: return{
            ...state,
            success: []
        }

        case CLEAR_ERRORS_AUTH: return{
            ...state,
            errors: []
        }


        default : return state
    } 
}

export default authReducer