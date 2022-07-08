
import { IOrderFromServer } from '../../utils/types';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    REMOVE_ORDER
} from '../actions/feed-constants';
import { TFeedActions } from '../actions/feed-types';

type TFeedState = {
    getOrderRequest: boolean,
    getOrderSuccess: boolean,
    getOrderFailed: boolean,

    selectedOrder: Array<IOrderFromServer> | null,
}

const initialState = {
    getOrderRequest: false,
    getOrderSuccess: false,
    getOrderFailed: false,

    selectedOrder: null
};

// Создадим редьюсер для WebSocket
export const feedReducer = (state = initialState, action: TFeedActions): TFeedState => {
    switch (action.type) {

        case GET_ORDER_REQUEST:
            return {
                ...state,
                getOrderRequest: true,
            };

        case GET_ORDER_SUCCESS:
            return {
                ...state,
                getOrderRequest: false,
                getOrderSuccess: true,
                getOrderFailed: false,
                selectedOrder: action.payload
            };

        case GET_ORDER_FAILED:
            return {
                ...state,
                getOrderRequest: false,
                getOrderSuccess: false,
                getOrderFailed: true,
            };

        case REMOVE_ORDER:
            return {
                ...state,
                selectedOrder: null
            };

        default:
            return state;
    }
};