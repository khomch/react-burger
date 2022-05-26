import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients'
import { authReducer } from './auth'
import { enterReducer } from './entrance';

export const rootReducer = combineReducers({ 
    ingredientsStore: ingredientsReducer,
    auth: authReducer,
    enter: enterReducer
 })