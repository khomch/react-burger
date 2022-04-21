import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import ingredientsPropTypes from '../../utils/types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';



function BurgerIngredients(props) {
  console.log(props)

  return (
    <section className={BurgerIngredientsStyles.ingredients}>
      <div className={`text text_type_main-default ${BurgerIngredientsStyles.tabs}`}>
        <Tab value="one" active={true} onClick={console.log}>
          Булки
        </Tab>
        <Tab value="two" active={false} onClick={console.log}>
          Соусы
        </Tab>
        <Tab value="three" active={false} onClick={console.log}>
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyles.ingredientsContainer}>

        <h2 className={BurgerIngredientsStyles.h2}>Булки</h2>
        {props.data
          .filter((item) => item.type === 'bun')
          .map((ingredient) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id} onClick={props.handleOpenIngredient} id={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt={ingredient.name} />
                <Counter count={1} size="default" />
                <p className={`${BurgerIngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`${BurgerIngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
            )
          })
        }

        <h2 className={BurgerIngredientsStyles.h2}>Соусы</h2>
        {props.data
          .filter((item) => item.type === 'sauce')
          .map((ingredient) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id} onClick={props.handleOpenIngredient} id={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt={ingredient.name} />
                <Counter count={1} size="default" />
                <p className={`${BurgerIngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`${BurgerIngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
            )
          })
        }

        <h2 className={BurgerIngredientsStyles.h2}>Начинки</h2>
        {props.data
          .filter((item) => item.type === 'main')
          .map((ingredient) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id} onClick={props.handleOpenIngredient} id={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt={ingredient.name} />
                <Counter count={1} size="default" />
                <p className={`${BurgerIngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`${BurgerIngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
            )
          })
        }

      </div>

    </section>
  );
}

BurgerIngredients.propTypes = {
  data: ingredientsPropTypes.data.isRequired,
  handleAddIngredient: PropTypes.func.isRequired,
  handleOpenIngredient: PropTypes.func.isRequired
};

export default BurgerIngredients;
