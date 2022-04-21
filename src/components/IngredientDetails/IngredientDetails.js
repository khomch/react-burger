import React from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import PropTypes from 'prop-types';
import ingredientsPropTypes from '../../utils/types'

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
    ingredientData: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired,
        calories: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        image_mobile: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        __v: PropTypes.number.isRequired
      }).isRequired
};

export default IngredientDetails;