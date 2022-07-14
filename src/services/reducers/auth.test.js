import { authReducer } from "./auth";
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
} from "../actions/auth-constants";

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual(
            {
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

                logoutRequest: false,
                logoutSuccess: false,
                logoutFailed: false,

                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: false,

                updateUserRequest: false,
                updateUserSuccess: false,
                updateUserFailed: false,

                user: null,
            }
        )
    })
    it('should handle FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual(
            {
                forgotPasswordRequest: true,
                forgotPasswordSuccess: false,
                forgotPasswordFailed: false,
            }
        )
    })
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual(
            {
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
            }
        )
    })
    it('should handle FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual(
            {
                forgotPasswordSuccess: true,
                forgotPasswordRequest: false,
                forgotPasswordFailed: false,
            }
        )
    })
    it('should handle FORGOT_PASSWORD_FAILED', () => {
        expect(
            authReducer({}, {
                type: FORGOT_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                forgotPasswordFailed: true,
                forgotPasswordSuccess: false,
                forgotPasswordRequest: false,
            }
        )
    })
    it('should handle RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_REQUEST,
            })
        ).toEqual(
            {
                resetPasswordRequest: true,
                resetPasswordSuccess: false,
                resetPasswordFailed: false,
            }
        )
    })
    it('should handle RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_SUCCESS,
            })
        ).toEqual(
            {
                resetPasswordSuccess: true,
                resetPasswordRequest: false,
                resetPasswordFailed: false,
            }
        )
    })
    it('should handle RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer({}, {
                type: RESET_PASSWORD_FAILED,
            })
        ).toEqual(
            {
                resetPasswordFailed: true,
                resetPasswordSuccess: false,
                resetPasswordRequest: false,
            }
        )
    })
    it('should handle REGISTRATION_REQUEST', () => {
        expect(
            authReducer({}, {
                type: REGISTRATION_REQUEST,
            })
        ).toEqual(
            {
                registrationRequest: true,
                registrationSuccess: false,
                registrationFailed: false,
            }
        )
    })
    it('should handle REGISTRATION_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: REGISTRATION_SUCCESS,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            })
        ).toEqual(
            {
                registrationRequest: false,
                registrationSuccess: false,
                registrationFailed: false,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            }
        )
    })
    it('should handle REGISTRATION_FAILED', () => {
        expect(
            authReducer({}, {
                type: REGISTRATION_FAILED,
            })
        ).toEqual(
            {
                registrationRequest: false,
                registrationSuccess: false,
                registrationFailed: true,
            }
        )
    })
    it('should handle LOGIN_REQUEST', () => {
        expect(
            authReducer({}, {
                type: LOGIN_REQUEST,
            })
        ).toEqual(
            {
                loginRequest: true,
                loginSuccess: false,
                loginFailed: false,
            }
        )
    })
    it('should handle LOGIN_SUCCESS', () => {
        expect(
            authReducer({}, {
                type: LOGIN_SUCCESS,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }

            })
        ).toEqual(
            {
                loginRequest: false,
                loginSuccess: true,
                loginFailed: false,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            }
        )
    })
    it('should handle LOGIN_FAILED', () => {
        expect(
            authReducer({}, {
                type: LOGIN_FAILED,
            })
        ).toEqual(
            {
                loginRequest: false,
                loginSuccess: false,
                loginFailed: true,
            }
        )
    })
    it('should handle LOGOUT_REQUEST', () => {
        expect(
            authReducer({}, {
                type: LOGOUT_REQUEST,
            })
        ).toEqual(
            {
                logoutRequest: true,
                logoutSuccess: false,
                logoutFailed: false,
            }
        )
    })
    it('should handle LOGOUT_SUCCESS', () => {
        expect(
            authReducer({
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            }, {
                type: LOGOUT_SUCCESS,
            })
        ).toEqual(
            {
                logoutRequest: false,
                logoutSuccess: true,
                logoutFailed: false,
                user: null
            }
        )
    })
    it('should handle LOGOUT_FAILED', () => {
        expect(
            authReducer({
            }, {
                type: LOGOUT_FAILED,
            })
        ).toEqual(
            {
                logoutRequest: false,
                logoutSuccess: false,
                logoutFailed: true,
            }
        )
    })
    it('should handle GET_USER_REQUEST', () => {
        expect(
            authReducer({
            }, {
                type: GET_USER_REQUEST,
            })
        ).toEqual(
            {
                getUserRequest: true,
                getUserSuccess: false,
                getUserFailed: false,
            }
        )
    })
    it('should handle GET_USER_SUCCESS', () => {
        expect(
            authReducer({
            }, {
                type: GET_USER_SUCCESS,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            })
        ).toEqual(
            {
                getUserRequest: false,
                getUserSuccess: true,
                getUserFailed: false,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            }
        )
    })
    it('should handle GET_USER_FAILED', () => {
        expect(
            authReducer({
            }, {
                type: GET_USER_FAILED,
            })
        ).toEqual(
            {
                getUserRequest: false,
                getUserSuccess: false,
                getUserFailed: true,
            }
        )
    })
    it('should handle UPDATE_USER_REQUEST', () => {
        expect(
            authReducer({
            }, {
                type: UPDATE_USER_REQUEST,
            })
        ).toEqual(
            {
                updateUserRequest: true,
                updateUserSuccess: false,
                updateUserFailed: false,
            }
        )
    })
    it('should handle UPDATE_USER_SUCCESS', () => {
        expect(
            authReducer({
            }, {
                type: UPDATE_USER_SUCCESS,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            })
        ).toEqual(
            {
                updateUserRequest: false,
                updateUserSuccess: true,
                updateUserFailed: false,
                user: {
                    email: 'aaa@aa.com',
                    name: "aaa"
                }
            }
        )
    })
    it('should handle UPDATE_USER_FAILED', () => {
        expect(
            authReducer({
            }, {
                type: UPDATE_USER_FAILED,
            })
        ).toEqual(
            {
                updateUserRequest: false,
                updateUserSuccess: false,
                updateUserFailed: true,
            }
        )
    })
})