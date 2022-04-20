import React from 'react';
import IngredientDetailsStyles from './IngredientDetails.module.css';
import Modal from '../Modal/Modal';
import ingredientsPropTypes from '../../utils/types'

function IngredientDetails(props) {

    return (

        <Modal
            data={props.data}
            closeModal={props.closeModal}
            modalState={props.modalState}
            handleOverlayClick={props.handleOverlayClick} 
            >

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
        </Modal>

    )
}

IngredientDetails.propTypes = ingredientsPropTypes;

export default IngredientDetails;