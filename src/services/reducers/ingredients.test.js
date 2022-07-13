import { ingredientsReducer } from "./ingredients";
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

describe('ingredientsReducer', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(
            {
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
            }
        )
    })
    it('should handle GET_ORDER_REQUEST', () => {
        expect(
            ingredientsReducer({}, {
                type: GET_INGREDIENTS_REQUEST,
            })
        ).toEqual(
            {
                ingredientsRequest: true,
            }
        )
    })
    it('should handle GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer({},
                {
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: [{
                        "_id": "1",
                    }, {
                        "_id": "2",
                    }]
                }
            )
        ).toEqual(
            {
                ingredientsFailed: false,
                ingredientsRequest: false,
                ingredients: [{
                    "_id": "1",
                }, {
                    "_id": "2",
                }]
            }
        )
    })
    it('should handle GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer({},
                {
                    type: GET_INGREDIENTS_FAILED,
                }
            )
        ).toEqual(
            {
                ingredientsFailed: true,
                ingredientsRequest: false,
            }
        )
    })
    it('should handle OPEN_SELECTED_INGREDIENT', () => {
        expect(
            ingredientsReducer(
                {
                    ingredients: [{
                        "_id": "1"
                    }],
                }
                ,
                {
                    type: OPEN_SELECTED_INGREDIENT,
                    currentIngredientId: "1"
                }
            )
        ).toEqual(
            {
                ingredients: [{
                    "_id": "1"
                }],
                currentIngredient: {
                    "_id": "1"
                },

            }
        )
    })
    it('should handle SEND_ORDER_REQUEST', () => {
        expect(
            ingredientsReducer({},
                {
                    type: SEND_ORDER_REQUEST,
                }
            )
        ).toEqual(
            {
                orderRequest: true
            }
        )
    })
    it('should handle SEND_ORDER_SUCCESS', () => {
        expect(
            ingredientsReducer({},
                {
                    type: SEND_ORDER_SUCCESS,
                    order: {
                        "name": "1",
                        "order": {
                            123: 123
                        },
                        "success": true
                    }
                }
            )
        ).toEqual(
            {
                orderFailed: false,
                orderRequest: false,
                order:
                {
                    "name": "1",
                    "order": {
                        123: 123
                    },
                    "success": true
                },
                modalState: true,
            }
        )
    })
    it('should handle SEND_ORDER_FAILED', () => {
        expect(
            ingredientsReducer({},
                {
                    type: SEND_ORDER_FAILED,
                }
            )
        ).toEqual(
            {
                orderFailed: true,
                orderRequest: false,
            }
        )
    })
    it('should handle CLOSE_ORDER', () => {
        expect(
            ingredientsReducer({},
                {
                    type: CLOSE_ORDER,
                }
            )
        ).toEqual(
            {
                selectedBun: null,
                selectedIngredients: [],
            }
        )
    })
    it('should handle ADD_INGREDIENT — BUN', () => {
        expect(
            ingredientsReducer({
            },
                {
                    type: ADD_INGREDIENT,
                    ingredient: {
                        "type": "bun",
                        "_id": "3"
                    },
                    nanoid: 'id123'
                }
            )
        ).toEqual(
            {
                selectedBun: {
                    "type": "bun",
                    "_id": "3"
                },
            }
        )
    })
    it('should handle ADD_INGREDIENT — !BUN', () => {
        expect(
            ingredientsReducer({
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122'
                    }
                ]
            },
                {
                    type: ADD_INGREDIENT,
                    ingredient: {
                        type: "sauce",
                        _id: "2"
                    },
                    nanoid: 'id123'
                }
            )
        ).toEqual(
            {
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122'
                    },
                    {
                        type: "sauce",
                        _id: "2",
                        nanoid: 'id123'
                    }
                ],
            }
        )
    })
    it('should handle DELETE_INGREDIENT', () => {
        expect(
            ingredientsReducer({
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122'
                    },
                    {
                        type: "sauce",
                        _id: "2",
                        nanoid: 'id123'
                    }
                ]
            },
                {
                    type: DELETE_INGREDIENT,
                    ingredientToDelNanoId: 'id123'
                }
            )
        ).toEqual(
            {
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122'
                    },
                ],
            }
        )
    })
    it('should handle UPDATE_SELECTED_INGREDIENTS', () => {
        expect(
            ingredientsReducer({
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122',
                        dragIndex: 1,
                        hoverIndex: 1
                    },
                    {
                        type: "sauce",
                        _id: "2",
                        nanoid: 'id123',
                        dragIndex: 1,
                        hoverIndex: 1
                    }
                ]
            },
                {
                    type: UPDATE_SELECTED_INGREDIENTS,
                    dragIndex: 1,
                    hoverIndex: 1,

                }
            )
        ).toEqual(
            {
                selectedIngredients: [
                    {
                        type: "mains",
                        _id: "1",
                        nanoid: 'id122',
                        dragIndex: 1,
                        hoverIndex: 1
                    },
                    {
                        type: "sauce",
                        _id: "2",
                        nanoid: 'id123',
                        dragIndex: 1,
                        hoverIndex: 1
                    }
                ],
            }
        )
    })

})