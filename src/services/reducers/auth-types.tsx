import { TUser } from "../../utils/types";

export type TAuthState = {
    forgotPasswordSuccess: boolean,
    forgotPasswordRequest: boolean,
    forgotPasswordFailed: boolean,

    resetPasswordSuccess: boolean,
    resetPasswordRequest: boolean,
    resetPasswordFailed: boolean,

    registrationRequest: boolean,
    registrationSuccess: boolean,
    registrationFailed: boolean,

    loginRequest: boolean,
    loginSuccess: boolean,
    loginFailed: boolean,

    logoutRequest: boolean,
    logoutSuccess: boolean,
    logoutFailed: boolean,

    getUserRequest: boolean,
    getUserSuccess: boolean,
    getUserFailed: boolean,

    updateUserRequest: boolean,
    updateUserSuccess: boolean,
    updateUserFailed: boolean,

    user: TUser | null,
}