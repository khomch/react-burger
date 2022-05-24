import { setCookie, getCookie, deleteCookie } from '../../utils/cookies'

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED';
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';

const baseUrl = "https://norma.nomoreparties.space/api/";

// проверяем ответ сервера
const checkResponse = (res) => {
    if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
}

const registrationRequest = (data) => {
    console.log(data)
    return (fetch(`${baseUrl}auth/register`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: data.email,
            password: data.password,
            name: data.name
        })
    })
        .then(checkResponse))
}

export function registration(data) {
    return function (dispatch) {
        dispatch({
            type: REGISTRATION_REQUEST
        })
        registrationRequest(data)
            .then(res => {

                if (res && res.success) {
                    console.log(res)
                    dispatch({
                        type: REGISTRATION_SUCCESS,
                        user: res.user
                    })
                }
            })
            .catch(err => dispatch({
                type: REGISTRATION_FAILED,
                err: err
            }));
    }
}

const loginRequest = (data) => {
    return (fetch(`${baseUrl}auth/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: data.email,
            password: data.password
        })
    })
        .then(checkResponse))
}

const updateToken = async () => {
    await (
        fetch(`${baseUrl}auth/token`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ token: getCookie('refreshToken') })
        })
            .then(checkResponse))
        .then(res => {
            setToken(res)
        })
}

const setToken = (res) => {
    if (res.success && res.accessToken.indexOf('Bearer') === 0) {
        setCookie('token', res.accessToken.split('Bearer ')[1], { expires: 1200 });
        setCookie('refreshToken', res.refreshToken);
    }
    if (!getCookie('token') && getCookie('refreshToken')) {
        updateToken()
    }
}

const checkToken = () => {
    if (getCookie('token')) {
        return getCookie('token')
    } else if (!getCookie('token') && getCookie('refreshToken')) {
        return updateToken()
    }
}

const getUserRequest = () =>
    fetch(`${baseUrl}auth/user`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });

export function getUser() {
    return function (dispatch) {
        if (getCookie('token') || getCookie('refreshToken')) {
            dispatch({
                type: GET_USER_REQUEST
            })
            getUserRequest()
                .then(data => data.json())
                .then(res => {
                    if (res && res.success) {
                        dispatch({
                            type: GET_USER_SUCCESS,
                            user: res.user
                        })
                    } else if (!res.success) {
                        checkToken()
                    }
                })
                .catch(err => dispatch({
                    type: GET_USER_FAILED,
                    err: err
                }));
        }

    }
}



const updateUserRequest = (data) => {
    return (fetch(`${baseUrl}auth/user`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: "PATCH",
        body: JSON.stringify({
            email: data.email,
            name: data.name,
            password: data.password
        })
    })
        .then(checkResponse))
}


export function updateUser(data) {
    return function (dispatch) {
        dispatch({
            type: UPDATE_USER_REQUEST
        })
        updateUserRequest(data)
            .then(res => {

                if (res && res.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: res.user
                    })
                }
            })
            .catch(err => dispatch({
                type: UPDATE_USER_FAILED,
                err: err
            }));
    }
}


export function login(data) {
    return function (dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        })
        loginRequest(data)
            .then(res => {

                if (res && res.success) {
                    dispatch({
                        type: LOGIN_SUCCESS,
                        user: res.user
                    })
                    setToken(res)
                }
            })
            .catch(err => dispatch({
                type: LOGIN_FAILED,
                err: err
            }));
    }
}

const logoutRequest = () => {
    return (fetch(`${baseUrl}auth/logout`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ token: getCookie('refreshToken') })
    })
        .then(checkResponse))
}

export function logout() {
    return function (dispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })
        logoutRequest()
            .then(res => {

                if (res && res.success) {
                    console.log(res)
                    dispatch({
                        type: LOGOUT_SUCCESS,
                    })
                    deleteCookie('token');
                    deleteCookie('refreshToken');
                }
            })
            .catch(err => dispatch({
                type: LOGOUT_FAILED,
                err: err
            }));
    }
}


const forgotPasswordRequest = (data) => {
    return (fetch(`${baseUrl}password-reset/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            email: data
        })
    })
        .then(checkResponse))
}

export function forgotPassword(data) {
    return function (dispatch) {
        dispatch({
            type: FORGOT_PASSWORD_REQUEST
        })
        forgotPasswordRequest(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: FORGOT_PASSWORD_SUCCESS,
                    })
                }
            })
            .catch(err => dispatch({
                type: FORGOT_PASSWORD_FAILED,
                err: err
            }));
    }
}

const resetPasswordRequest = (data) => {
    return (fetch(`${baseUrl}password-reset/reset/`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
            password: data.password,
            token: data.token
        })
    })
        .then(checkResponse))
}

export function resetPassword(data) {
    return function (dispatch) {
        dispatch({
            type: RESET_PASSWORD_REQUEST
        })
        resetPasswordRequest(data)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: RESET_PASSWORD_SUCCESS,
                    })
                }
            })
            .catch(err => dispatch({
                type: RESET_PASSWORD_FAILED,
                err: err
            }));
    }
}