import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware } from 'redux';
import { legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socket-middleware';

import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE
} from './actions/ws-constants';
import { getCookie } from '../utils/cookies';

const accessToken = getCookie('token')

const wsUrl = `wss://norma.nomoreparties.space/orders/all?token=${accessToken}}`;
const wsActions = {
    wsInit: WS_CONNECTION_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE
};

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(socketMiddleware(wsUrl, wsActions), thunk)));

export default store;