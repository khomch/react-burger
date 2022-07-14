import { checkToken } from "../services/actions/auth";

export const wsUrlFeed = `wss://norma.nomoreparties.space/orders/all`;
export const wsUrlProfile = () => {
    if (checkToken()) {
        return `wss://norma.nomoreparties.space/orders?token=${checkToken()}`;
    } else {
        return null
    }
}



