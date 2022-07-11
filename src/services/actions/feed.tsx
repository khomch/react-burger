import { baseUrl } from '../../utils/constants';
import { checkResponse } from '../../utils/check-response';
import { AppDispatch } from '../store-types';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    REMOVE_ORDER,
} from './feed-constants'
import { IGetOrderResp } from '../../utils/types';



const getOrderRequest = (orderNumber: string): Promise<IGetOrderResp> => {
    return (fetch(`${baseUrl}orders/${orderNumber}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
    })
        .then(checkResponse))
}

export const getOrder = (orderNumber: string) => {
    return function (dispatch: AppDispatch) {
        dispatch({
            type: GET_ORDER_REQUEST
        })
        getOrderRequest(orderNumber)
            .then(res => {
                if (res && res.success) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        payload: res.orders
                    })
                }
            })
            .catch(err => dispatch({
                type: GET_ORDER_FAILED,
                err: err
            }));
    }
}

export const removeOrder = () => {
    return {
        type: REMOVE_ORDER
    }
}