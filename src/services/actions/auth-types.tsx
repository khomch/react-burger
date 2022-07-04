import { TUser } from '../../utils/types';
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

export interface IRegistrationRequest {
    readonly type: typeof REGISTRATION_REQUEST
};

export interface IRegistrationSuccess {
    readonly type: typeof REGISTRATION_SUCCESS,
    readonly user: TUser
};

export interface IRegistrationFailed {
    readonly type: typeof REGISTRATION_FAILED
};

export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST
};

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS,
    readonly user: TUser
};

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED
};

export interface IUpdateUserRequest {
    readonly type: typeof UPDATE_USER_REQUEST
};

export interface IUpdateUserSuccess {
    readonly type: typeof UPDATE_USER_SUCCESS,
    readonly user: TUser
};

export interface IUpdateUserFailed {
    readonly type: typeof UPDATE_USER_FAILED
};

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST
};

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS,
    readonly user: TUser
};

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED
};

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST
};

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS
};

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED
};

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
};

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
};

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED
};

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
};

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
};

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED
};

export type TAuthActions =
    | IRegistrationRequest
    | IRegistrationSuccess
    | IRegistrationFailed
    | IGetUserRequest
    | IGetUserSuccess
    | IGetUserFailed
    | IUpdateUserRequest
    | IUpdateUserSuccess
    | IUpdateUserFailed
    | ILoginRequest
    | ILoginSuccess
    | ILoginFailed
    | ILogoutRequest
    | ILogoutSuccess
    | ILogoutFailed
    | IForgotPasswordRequest
    | IForgotPasswordSuccess
    | IForgotPasswordFailed
    | IResetPasswordRequest
    | IResetPasswordSuccess
    | IResetPasswordFailed