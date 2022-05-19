import update from 'immutability-helper';

import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    ADD_INGREDIENT,
    OPEN_SELECTED_INGREDIENT,
    CLOSE_MODAL,
    SEND_ORDER_FAILED,
    SEND_ORDER_REQUEST,
    SEND_ORDER_SUCCESS,
    CLOSE_ORDER,
    ADD_DRAGGED_INGREDIENT,
    DELETE_INGREDIENT,
    UPDATE_SELECTED_INGREDIENTS,
} from "../actions";

const initialState = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    selectedBun: [],
    selectedIngredients: [],

    currentIngredient: {},
    modalState: false,

    order: {},
    orderRequest: false,
    orderFailed: false,
};

export const rootReducer = (state = initialState, action) => {
    function defineIngredientByType(array) {
        
        const ingredient = array.find((element) => (element._id === action.selectedIngredientId));

        if (ingredient.type !== "bun") {
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients, 
                    { ...ingredient, 
                        nanoid: action.nanoid}],
            }
        } else if (ingredient.type === "bun") {
            return {
                ...state,
                selectedBun: ingredient
            }
        }
    }

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
                ingredients: action.ingredients
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
            }
        }
        case ADD_INGREDIENT: {
            return defineIngredientByType(state.ingredients)
        }
        case OPEN_SELECTED_INGREDIENT: {
            return {
                ...state,
                currentIngredient: state.ingredients.find((element) => (element._id === action.currentIngredientId)),
                modalState: true,
            }
        }
        case CLOSE_MODAL: {
            return {
                ...state,
                currentIngredient: {},
                modalState: false,
                order: {}
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
                modalState: true
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
                selectedBun: [],
                selectedIngredients: [],
            }
        }

        case ADD_DRAGGED_INGREDIENT: {
            return defineIngredientByType(state.ingredients)
        }

        case DELETE_INGREDIENT: {
            return {
                ...state,
                selectedIngredients: [...state.selectedIngredients].filter(element => element.nanoid !== action.ingredientToDelNanoId)
            }
        }

        case UPDATE_SELECTED_INGREDIENTS: {
            return {
                ...state,
                selectedIngredients: update([...state.selectedIngredients], { $splice: [[action.dragIndex, 1],[action.hoverIndex, 0, [...state.selectedIngredients][action.dragIndex]]]})
            }
        }

        default: {
            return state;
        }
    }
}


