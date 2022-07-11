import { TIngredient, TOrder } from '../../utils/types'
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    ADD_INGREDIENT,
    OPEN_SELECTED_INGREDIENT,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    SEND_ORDER_FAILED,
    CLOSE_ORDER,
    DELETE_INGREDIENT,
    UPDATE_SELECTED_INGREDIENTS,
} from './ingredients-constants'

export interface IGetIngredients {
    readonly type: typeof GET_INGREDIENTS_REQUEST
};

export interface IGetIngredientsSuccess {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly ingredients: TIngredient[]
};

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
};

export interface IOpenSelectedIngredient {
    readonly type: typeof OPEN_SELECTED_INGREDIENT,
    readonly currentIngredientId: string,
};

export interface ISendOrderRequest {
    readonly type: typeof SEND_ORDER_REQUEST,
};

export interface ISendOrderSuccess {
    readonly type: typeof SEND_ORDER_SUCCESS,
    readonly order: TOrder
};

export interface ISendOrderFailed {
    readonly type: typeof SEND_ORDER_FAILED,
};

export interface ICloseOrder {
    readonly type: typeof CLOSE_ORDER,
};

export interface ICloseOrder {
    readonly type: typeof CLOSE_ORDER,
};

export interface IAddIngredient {
    readonly type: typeof ADD_INGREDIENT,
    readonly selectedIngredientId: string,
    readonly ingredient: TIngredient,
    readonly nanoid: string
};

export interface IDeleteIngredient {
    readonly type: typeof DELETE_INGREDIENT,
    readonly ingredientToDelNanoId: string
};

export interface IUpdateSelectedIngredients {
    readonly type: typeof UPDATE_SELECTED_INGREDIENTS,
    readonly dragIndex: number,
    readonly hoverIndex: number
};

export type TIngredientsActions =
    | IGetIngredients
    | IGetIngredientsSuccess
    | IGetIngredientsFailed
    | IAddIngredient
    | IOpenSelectedIngredient
    | ISendOrderRequest
    | ISendOrderSuccess
    | ISendOrderFailed
    | ICloseOrder
    | IDeleteIngredient
    | IUpdateSelectedIngredients