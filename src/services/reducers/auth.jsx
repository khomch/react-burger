import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    REGISTRATION_REQUEST,
    REGISTRATION_SUCCESS,
    REGISTRATION_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,

} from "../actions/auth";

const initialState = {
    forgotPasswordSuccess: false,
    forgotPasswordRequest: false,
    forgotPasswordFailed: false,
    
    resetPasswordSuccess: false,
    resetPasswordRequest: false,
    resetPasswordFailed: false,

    registrationRequest: false,
    registrationSuccess: false,
    registrationFailed: false,

    loginRequest: false,
    loginSuccess: false,
    loginFailed: false,

    logOutRequest: false,
    logOutSuccess: false,
    logOutFailed: false,

    getUserRequest: false,
    getUserSuccess: false,
    getUserFailed: false,

    user: {},

};


export const authReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST: {
            return {
                ...state,
                forgotPasswordRequest: true,
                forgotPasswordSuccess: false,
                forgotPasswordFailed: false,
            }
        }
        case FORGOT_PASSWORD_SUCCESS: {
            return {
                ...state,
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
            }
        }
        case FORGOT_PASSWORD_FAILED: {
            return {
                ...state,
                forgotPasswordFailed: true,
                forgotPasswordSuccess: false,
                forgotPasswordRequest: false,
            }
        }
        case RESET_PASSWORD_REQUEST: {
            return {
                ...state,
                resetPasswordRequest: true,
                resetPasswordSuccess: false,
                resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            }
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                resetPasswordFailed: true,
                resetPasswordSuccess: false,
                resetPasswordRequest: false,
            }
        }
        case REGISTRATION_REQUEST: {
            return {
                ...state,
                registrationRequest: true,
                registrationSuccess: false,
                registrationFailed: false,
            }
        }
        case REGISTRATION_SUCCESS: {
            return {
                ...state,
                registrationRequest: false,
                registrationSuccess: false,
                registrationFailed: false,
                user: action.user
            }
        }
        case REGISTRATION_FAILED: {
            return {
                ...state,
                registrationRequest: false,
                registrationSuccess: false,
                registrationFailed: true,
            }
        }
        case LOGIN_REQUEST: {
            return {
                ...state,
                loginRequest: true,
                loginSuccess: false,
                loginFailed: false,
            }
        }
        case LOGIN_SUCCESS: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: true,
                loginFailed: false,
                user: action.user
            }
        }
        case LOGIN_FAILED: {
            return {
                ...state,
                loginRequest: false,
                loginSuccess: false,
                loginFailed: true,
            }
        }
        case LOGOUT_REQUEST: {
            return {
                ...state,
                logoutRequest: true,
                logoutSuccess: false,
                logoutFailed: false,
            }
        }
        case LOGOUT_SUCCESS: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: true,
                logoutFailed: false,
                user: {}
            }
        }
        case LOGOUT_FAILED: {
            return {
                ...state,
                logoutRequest: false,
                logoutSuccess: false,
                logoutFailed: true,
            }
        }
        case GET_USER_REQUEST: {
            return {
                ...state,
                getUserRequest: true,
                getUserSuccess: false,
                getUserFailed: false,
            }
        }
        case GET_USER_SUCCESS: {
            return {
                ...state,
                getUserRequest: false,
                getUserSuccess: true,
                getUserFailed: false,
                user: action.user
            }
        }
        case GET_USER_FAILED: {
            return {
                ...state,
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: true,
            }
        }
        case UPDATE_USER_REQUEST: {
            return {
                ...state,
                updateUserRequest: true,
                updateUserSuccess: false,
                updateUserFailed: false,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: true,
                updateUserFailed: false,
                user: action.user
            }
        }
        case UPDATE_USER_FAILED: {
            return {
                ...state,
                updateUserRequest: false,
                updateUserSuccess: false,
                updateUserFailed: true,
            }
        }

        default: {
            return state;
        }
    }
}
