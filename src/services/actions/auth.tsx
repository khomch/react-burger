import { setCookie, getCookie, deleteCookie } from '../../utils/cookies'
import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/check-response';
import { ILoginReq, ILoginResp, IRegistrationReq, IRegistrationResp, IUserRequestReq, IUserRequestResp } from '../../utils/types';
import { AppDispatch } from '../store-types';

import {
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAILED,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    REGISTRATION_REQUEST,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    LOGIN_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    GET_USER_FAILED,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    UPDATE_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS
} from './auth-constants';

const registrationRequest = (data: IRegistrationReq): Promise<IRegistrationResp> => {
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

export const registration = (data: IRegistrationReq) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: REGISTRATION_REQUEST
        })
        registrationRequest(data)
            .then(res => {
                if (res && res.success) {
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

const loginRequest = (data: ILoginReq): Promise<ILoginResp> => {
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

const setToken = (res: ILoginResp) => {
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

export const getUser = () => {
    return function (dispatch: AppDispatch) {
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

const updateUserRequest = (data: Partial<IUserRequestReq>): Promise<IUserRequestResp> => {
    return (fetch(`${baseUrl}auth/user`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('token')
        },
        method: "PATCH",
        body: JSON.stringify({
            email: data.login,
            name: data.name,
            password: data.password
        })
    })
        .then(checkResponse))
}

export const updateUser = (data: Partial<IUserRequestReq>) => {
    return function (dispatch: AppDispatch) {
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


export const login = (data: ILoginReq) => {
    return function (dispatch: AppDispatch) {
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

export const logout = () => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: LOGOUT_REQUEST
        })
        logoutRequest()
            .then(res => {

                if (res && res.success) {
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


const forgotPasswordRequest = (data: string) => {
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

export const forgotPassword = (data: string) => {
    return function (dispatch: AppDispatch) {
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

const resetPasswordRequest = (data: { password: string, token: string }) => {
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

export const resetPassword = (data: { password: string, token: string }) => {
    return function (dispatch: AppDispatch) {
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