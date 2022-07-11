import { IOrdersFeed } from "../../utils/types";
import {
    WS_CONNECTION_START_FEED,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_DISCONNECT
} from "./ws-constants";

export interface IWsConnectionStartFeed {
    readonly type: typeof WS_CONNECTION_START_FEED,
    readonly payload: string

};

export interface IWsConnectionStartProfile {
    readonly type: typeof WS_CONNECTION_START_PROFILE,
    readonly payload: string

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

export interface IWsDisconnect {
    readonly type: typeof WS_DISCONNECT
};

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
};

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: IOrdersFeed
};

export type TWsActions =
    | IWsConnectionStartFeed
    | IWsConnectionStartProfile
    | IWsConnectionSuccess
    | IWsConnectionError
    | IWsConnectionClosed
    | IWsGetMessage
    | IWsDisconnect