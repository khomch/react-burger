import update from 'immutability-helper';
import { TIngredientsState } from './ingredients-types';
import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    ADD_INGREDIENT,
    OPEN_SELECTED_INGREDIENT,
    SEND_ORDER_FAILED,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    CLOSE_ORDER,
    DELETE_INGREDIENT,
    UPDATE_SELECTED_INGREDIENTS,
} from "../actions/ingredients-constants";
import { TIngredientsActions } from '../actions/ingredients-types';


const initialState: TIngredientsState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selectedBun: null,
    selectedIngredients: [],

    currentIngredient: null,
    modalState: false,

    order: null,
    orderRequest: false,
    orderFailed: false,
};


export const ingredientsReducer = (state: TIngredientsState = initialState, action: TIngredientsActions): TIngredientsState => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredients: action.ingredients,
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            }
        }

        case OPEN_SELECTED_INGREDIENT: {
            return {
                ...state,
                currentIngredient: state.ingredients?.find((element: { _id: string }) => (element?._id === action.currentIngredientId)),
            }
        }
        case SEND_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            }
        }
        case SEND_ORDER_SUCCESS: {
            return {
                ...state,
                orderFailed: false,
                orderRequest: false,
                order: action.order,
                modalState: true,
            }
        }
        case SEND_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
            }
        }
        case CLOSE_ORDER: {
            return {
                ...state,
                selectedBun: null,
                selectedIngredients: [],
            }
        }

        case ADD_INGREDIENT: {
            return action.ingredient.type !== 'bun' ? {
                ...state,
                selectedIngredients: [...state.selectedIngredients,
                {
                    ...action.ingredient,
                    nanoid: action.nanoid
                }]
            } : {
                ...state,
                selectedBun: action.ingredient
            }
        }


        case DELETE_INGREDIENT: {
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients].filter((element: { nanoid: string }) => element.nanoid !== action.ingredientToDelNanoId)
            }
        }

        case UPDATE_SELECTED_INGREDIENTS: {
            return {
                ...state,
                selectedIngredients: update([...state.selectedIngredients], { $splice: [[action.dragIndex, 1], [action.hoverIndex, 0, [...state.selectedIngredients][action.dragIndex]]] })
            }
        }

        default: {
            return state;
        }
    }
}
