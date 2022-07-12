import { TAuthActions } from "./actions/auth-types";
import { TIngredientsActions } from "./actions/ingredients-types";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import store from "./store";
import { TWsActions } from "./actions/ws-types";
import { TFeedActions } from "./actions/feed-types";
import { TModalsActions } from "./actions/modals-types";

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TIngredientsActions | TAuthActions | TWsActions | TFeedActions | TModalsActions;

export type AppThunk<TReturn = void> = ThunkAction<TReturn, Action, RootState, TApplicationActions>

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
