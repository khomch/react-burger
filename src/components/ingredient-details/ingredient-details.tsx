import React, { useCallback } from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    addSelectedIngredient
} from '../../services/actions/ingredients';


export const IngredientDetails = ():any => {

    const dispatch = useDispatch();
    const addIngredient = useCallback((e) => {
        dispatch(addSelectedIngredient(e));
    }, [dispatch])

    const {
        ingredients
    }: any = useSelector<any>(store => store.ingredientsStore)

    const { id }: { id: string } = useParams();

    const ingredientToShow: any = ingredients.find((ingredient: { _id: string }) => ingredient._id === id)

if (ingredientToShow) {

    return (

        <div className={IngredientDetailsStyles.ingredientDetails} onClick={addIngredient} id={ingredientToShow._id}>
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
}

}