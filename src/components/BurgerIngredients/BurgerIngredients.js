import React, { useState } from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import ingredientPropTypes from '../../utils/types';
import { Tab, Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function BurgerIngredients(props) {
  // стейт для переключения табов
  const [currentTab, setCurrentTab] = useState('buns');

  // функция переключения таба
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section className={BurgerIngredientsStyles.ingredients}>
      <div className={`text text_type_main-default ${BurgerIngredientsStyles.tabs}`}>
        <Tab value="buns" active={currentTab === "buns"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauces" active={currentTab === "sauces"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="mains" active={currentTab === "mains"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={BurgerIngredientsStyles.ingredientsContainer}>

        <h2 className={BurgerIngredientsStyles.h2} id="buns">Булки</h2>
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

        <h2 className={BurgerIngredientsStyles.h2} id="sauces">Соусы</h2>
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

        <h2 className={BurgerIngredientsStyles.h2} id="mains">Начинки</h2>
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
  data: PropTypes.arrayOf(ingredientPropTypes.isRequired).isRequired,
  handleAddIngredient: PropTypes.func.isRequired,
  handleOpenIngredient: PropTypes.func.isRequired
};

export default BurgerIngredients;
