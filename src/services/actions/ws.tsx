import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE,
    WS_GET_MESSAGE
} from "./ws-constants";
import { IWsConnectionClosed, IWsConnectionError, IWsConnectionStart, IWsConnectionSuccess, IWsGetMessage, IWsSendMessage } from "./ws-types";

export const wsConnectionStart = (): IWsConnectionStart => {
    return {
        type: WS_CONNECTION_START
    };
};

export const wsConnectionSuccess = (): IWsConnectionSuccess => {
    return {
        type: WS_CONNECTION_SUCCESS
    };
};

export const wsConnectionError = (): IWsConnectionError => {
    return {
        type: WS_CONNECTION_ERROR
    };
};

export const wsConnectionClosed = (): IWsConnectionClosed => {
    return {
        type: WS_CONNECTION_CLOSED
    };
};

export const wsGetMessage = (message: any): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsSendMessage = (message: any): IWsSendMessage => {
    return {
        type: WS_SEND_MESSAGE,
        payload: message
    };
};