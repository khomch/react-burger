
import { IOrdersFeed } from '../../utils/types';
import {
    WS_CONNECTION_START_FEED,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,

} from '../actions/ws-constants';
import { TWsActions } from '../actions/ws-types';

type TWSState = {
    wsConnected: boolean;
    ordersFeed: IOrdersFeed | null;
    error?: Event;
}

const initialState = {
    wsConnected: false,
    ordersFeed: null,
    error: undefined,
};

// Создадим редьюсер для WebSocket
export const wsReducer = (state: TWSState = initialState, action: TWsActions): TWSState => {
    switch (action.type) {

        case WS_CONNECTION_START_FEED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };

        case WS_CONNECTION_START_PROFILE:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };

        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                wsConnected: true,
            };

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                wsConnected: false
            };

        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            };

        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                ordersFeed: action.payload
            };
        default:
            return state;
    }
};