import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';

import { AppDispatch, AppThunk } from '../services/store-types';
import { RootState } from '../services/store-types';

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = () => dispatchHook<AppDispatch, AppThunk>(); 

