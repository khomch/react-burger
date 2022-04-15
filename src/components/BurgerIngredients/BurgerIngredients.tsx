import React from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import PropTypes from 'prop-types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'




function BurgerIngredients(props: any) {

  return (
    <section className={BurgerIngredientsStyles.ingredients}>
      <div style={{ display: 'flex' }} className='text text_type_main-default'>
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
          .filter((item: any) => item.type === 'bun')
          .map((ingredient: any) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt="" />
                <Counter count={1} size="default" />
                <p className={`${BurgerIngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`${BurgerIngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
            )
          })
        }

        <h2 className={BurgerIngredientsStyles.h2}>Соусы</h2>
        {props.data
          .filter((item: any) => item.type === 'sauce')
          .map((ingredient: any) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt="" />
                <Counter count={1} size="default" />
                <p className={`${BurgerIngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
                <p className={`${BurgerIngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </div>
            )
          })
        }

        <h2 className={BurgerIngredientsStyles.h2}>Начинки</h2>
        {props.data
          .filter((item: any) => item.type === 'main')
          .map((ingredient: any) => {
            return (
              <div className={BurgerIngredientsStyles.ingredient} key={ingredient._id}>
                <img className={BurgerIngredientsStyles.image} src={ingredient.image} alt="" />
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
  data: PropTypes.arrayOf(PropTypes.shape({
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
  })
  )
};

export default BurgerIngredients;
