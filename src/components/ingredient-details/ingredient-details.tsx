import React, { useCallback } from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    addIngredient,
} from '../../services/actions/ingredients';
import { TIngredient } from '../../utils/types';


export const IngredientDetails = () => {
    const {
        ingredients
    }: any = useSelector<any>(store => store.ingredientsStore)

    const dispatch = useDispatch();
    const addSelectedIngredient = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const ingredientToAdd: TIngredient = ingredients.find((element: TIngredient) => element._id === e.currentTarget.id)
        dispatch(addIngredient(ingredientToAdd));
    }, [dispatch, ingredients])

    const { id }: { id: string } = useParams();

    const ingredientToShow = ingredients.find((ingredient: TIngredient) => ingredient._id === id)

    if (ingredientToShow) {
        return (
            <div className={IngredientDetailsStyles.ingredientDetails} onClick={addSelectedIngredient} id={ingredientToShow._id}>
                <div className={IngredientDetailsStyles.container}>
                    <h2 className={`text text_type_main-large ${IngredientDetailsStyles.title}`}>Детали ингредиента</h2>
                    <img src={ingredientToShow.image_large}
                        alt={ingredientToShow.name}
                        className={IngredientDetailsStyles.image}
                    ></img>

                    <p className={`text text_type_main-medium ${IngredientDetailsStyles.name}`}>{ingredientToShow.name}</p>
                    <ul className={IngredientDetailsStyles.nutritionList}>
                        <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`} >
                            <p>Калории, ккал</p>
                            <p>{ingredientToShow.calories}</p>
                        </li>

                        <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                            <p>Белки, г</p>
                            <p>{ingredientToShow.proteins}</p>
                        </li>

                        <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                            <p>Жиры, г</p>
                            <p>{ingredientToShow.fat}</p>
                        </li>

                        <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                            <p>Углеводы, г</p>
                            <p>{ingredientToShow.carbohydrates}</p>
                        </li>

                    </ul>
                </div>
            </div>
        )
    } else {
        return null
    }

}