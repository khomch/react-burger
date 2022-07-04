import { TIngredient, TConstructorIngredient } from '../../utils/types';

export type TIngredientsState = {
    ingredients: Array<TIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    selectedBun: object | TIngredient,
    selectedIngredients: Array<TConstructorIngredient>,

    currentIngredient: TIngredient | object | undefined,
    modalState: boolean,

    order: Array<TConstructorIngredient> | object,
    orderRequest: boolean,
    orderFailed: boolean,
}