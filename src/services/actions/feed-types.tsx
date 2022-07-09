import { IOrderFromServer } from '../../utils/types'
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    REMOVE_ORDER,
} from './feed-constants'


export interface IGetOrder {
    readonly type: typeof GET_ORDER_REQUEST
};

export interface IGetOrderSuccess {
    readonly type: typeof GET_ORDER_SUCCESS,
    readonly payload: IOrderFromServer[]
};

export interface IGetOrderFailed {
    readonly type: typeof GET_ORDER_FAILED
};

export interface IRemoveOrder{
    readonly type: typeof REMOVE_ORDER
};

export type TFeedActions =
    | IGetOrder
    | IGetOrderFailed
    | IGetOrderSuccess
    | IRemoveOrder