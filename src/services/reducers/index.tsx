import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients'
import { authReducer } from './auth'
import { wsReducer } from './ws';
import { feedReducer } from './feed';
import { modalsReducer } from './modals';

export const rootReducer = combineReducers({ 
    ingredientsStore: ingredientsReducer,
    auth: authReducer,
    ws: wsReducer,
    feed: feedReducer,
    modals: modalsReducer
 })