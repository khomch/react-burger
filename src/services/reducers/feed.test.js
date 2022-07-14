import { feedReducer } from './feed';
import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    REMOVE_ORDER
} from '../actions/feed-constants';

describe('feedReducer', () => {
    it('should return the initial state', () => {
        expect(feedReducer(undefined, {})).toEqual(
            {
                getOrderRequest: false,
                getOrderSuccess: false,
                getOrderFailed: false,

                selectedOrder: null
            }
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            feedReducer([], {
                type: GET_ORDER_REQUEST,
            })
        ).toEqual(
            {
                getOrderRequest: true,
            }
        )
    })
    it('should handle GET_ORDER_SUCCESS', () => {
        expect(
            feedReducer([],
                {
                    type: GET_ORDER_SUCCESS,
                    payload: []
                }
            )
        ).toEqual(
            {
                getOrderRequest: false,
                getOrderSuccess: true,
                getOrderFailed: false,
                selectedOrder: []
            }
        )
    })
    it('should handle GET_ORDER_FAILED', () => {
        expect(
            feedReducer([],
                {
                    type: GET_ORDER_FAILED,
                }
            )
        ).toEqual(
            {
                getOrderRequest: false,
                getOrderSuccess: false,
                getOrderFailed: true,
            }
        )
    })
    it('should handle REMOVE_ORDER', () => {
        expect(
            feedReducer([],
                {
                    type: REMOVE_ORDER,
                }
            )
        ).toEqual(
            {
                selectedOrder: null
            }
        )
    })
})