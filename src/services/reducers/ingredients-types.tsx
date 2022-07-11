import { TIngredient, TConstructorIngredient, TOrder } from '../../utils/types';

export type TIngredientsState = {
    ingredients: Array<TIngredient>,
    ingredientsRequest: boolean,
    ingredientsFailed: boolean,

    selectedBun: TIngredient | null,
    selectedIngredients: Array<TConstructorIngredient>,

    currentIngredient: TIngredient | null | undefined,
    modalState: boolean,

    order: TOrder | null,
    orderRequest: boolean,
    orderFailed: boolean,
}