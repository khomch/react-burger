import React from 'react';
import IngredientDetailsStyles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import ingredientPropTypes from '../../utils/types'

function IngredientDetails(props) {

    return (

        <div className={IngredientDetailsStyles.ingredientDetails} onClick={props.handleAddIngredient} id={props.ingredientData._id}>
            <div className={IngredientDetailsStyles.container}>
                <h2 className={`text text_type_main-large ${IngredientDetailsStyles.title}`}>Детали ингредиента</h2>
                <img src={props.ingredientData.image_large}
                    alt={props.ingredientData.name}
                    className={IngredientDetailsStyles.image}
                ></img>

                <p className={`text text_type_main-medium ${IngredientDetailsStyles.name}`}>{props.ingredientData.name}</p>
                <ul className={IngredientDetailsStyles.nutritionList}>
                    <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`} >
                        <p>Калории, ккал</p>
                        <p>{props.ingredientData.calories}</p>
                    </li>

                    <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                        <p>Белки, г</p>
                        <p>{props.ingredientData.proteins}</p>
                    </li>

                    <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                        <p>Жиры, г</p>
                        <p>{props.ingredientData.fat}</p>
                    </li>

                    <li className={`text text_type_main-default text_color_inactive ${IngredientDetailsStyles.nutrition}`}>
                        <p>Углеводы, г</p>
                        <p>{props.ingredientData.carbohydrates}</p>
                    </li>

                </ul>
            </div>
        </div>

    )
}

IngredientDetails.propTypes = {
    handleAddIngredient: PropTypes.func.isRequired,
    ingredientData: ingredientPropTypes.isRequired
};

export default IngredientDetails;