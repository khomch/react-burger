import { wsReducer } from "./ws";
import {
    WS_CONNECTION_START_FEED,
    WS_CONNECTION_START_PROFILE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CLEAR_FEED,

} from '../actions/ws-constants';


describe('wsReducer', () => {
    it('should return the initial state', () => {
        expect(wsReducer(undefined, {})).toEqual(
            {
                wsConnected: false,
                ordersFeed: null,
                error: undefined,
            }
        )
    })
    it('should handle WS_CONNECTION_START_FEED', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_START_FEED,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
            }
        )
    })
    it('should handle WS_CONNECTION_START_PROFILE', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_START_PROFILE,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
            }
        )
    })
    it('should handle WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_SUCCESS,
            })
        ).toEqual(
            {
                wsConnected: true,
            }
        )
    })
    it('should handle WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_ERROR,
                payload: { error: 'error' }
            })
        ).toEqual(
            {
                wsConnected: false,
                error: { error: 'error' }
            }
        )
    })
    it('should handle WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer({}, {
                type: WS_CONNECTION_CLOSED,
            })
        ).toEqual(
            {
                error: undefined,
                wsConnected: false,
            }
        )
    })
    it('should handle WS_GET_MESSAGE', () => {
        expect(
            wsReducer({}, {
                type: WS_GET_MESSAGE,
                payload: [{ _id: "1", _id: "2" }]
            })
        ).toEqual(
            {
                error: undefined,
                ordersFeed: [{ _id: "1", _id: "2" }]
            }
        )
    })
    it('should handle WS_GET_MESSAGE', () => {
        expect(
            wsReducer({}, {
                type: WS_GET_MESSAGE,
                payload: [{ _id: "1", _id: "2" }]
            })
        ).toEqual(
            {
                error: undefined,
                ordersFeed: [{ _id: "1", _id: "2" }]
            }
        )
    })
    it('should handle WS_CLEAR_FEED', () => {
        expect(
            wsReducer({}, {
                type: WS_CLEAR_FEED,
            })
        ).toEqual(
            {
                ordersFeed: null
            }
        )
    })

})