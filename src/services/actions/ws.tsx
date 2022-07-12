import { IOrdersFeed } from "../../utils/types";
import { wsUrlFeed, wsUrlProfile } from "../../utils/ws-address";
import {
    WS_CONNECTION_START_FEED,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_DISCONNECT,
    WS_CLEAR_FEED
} from "./ws-constants";
import { IWsClearFeed, IWsConnectionClosed, IWsConnectionError, IWsConnectionStartFeed, IWsConnectionStartProfile, IWsConnectionSuccess, IWsDisconnect, IWsGetMessage } from "./ws-types";

export const wsConnectionStartFeed = (): IWsConnectionStartFeed => {
    return {
        type: WS_CONNECTION_START_FEED,
        payload: wsUrlFeed

    };
};

export const wsConnectionStartProfile = (): IWsConnectionStartProfile => {
    return {
        type: WS_CONNECTION_START_PROFILE,
        payload: wsUrlProfile()

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

export const wsDisconnect = (): IWsDisconnect => {
    return {
        type: WS_DISCONNECT
    };
};

export const wsGetMessage = (message: IOrdersFeed): IWsGetMessage => {
    return {
        type: WS_GET_MESSAGE,
        payload: message
    };
};

export const wsClearFeed = (): IWsClearFeed => {
    return {
        type: WS_CLEAR_FEED,
    }
}