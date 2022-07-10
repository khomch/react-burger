import { getCookie } from "./cookies";

const accessToken = getCookie('token')

export const wsUrlFeed = `wss://norma.nomoreparties.space/orders/all`;
export const wsUrlProfile = `wss://norma.nomoreparties.space/orders?token=${accessToken}`;

