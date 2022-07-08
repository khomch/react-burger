import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_SEND_MESSAGE,
    WS_GET_MESSAGE
} from "./ws-constants";

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START

};

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS

};

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR
};

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
};

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload:
    {
        orders: Array<object>,
        total: number,
        totalToday: number
    } | null;

};

export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE,
    readonly payload: any
};

export type TWsActions =
    | IWsConnectionStart
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsSendMessage