import update from 'immutability-helper';
import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients'
import { authReducer } from './auth'

export const rootReducer = combineReducers({ 
    ingredientsStore: ingredientsReducer,
    auth: authReducer
 })