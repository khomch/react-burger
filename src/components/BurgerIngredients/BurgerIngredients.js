import React, { useState } from 'react';
import BurgerIngredientsStyles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Ingredient from '../Ingredient/Ingredient';



function BurgerIngredients(props) {
  // стейт для переключения табов
  const [currentTab, setCurrentTab] = useState('buns');
  // функция переключения таба
  const onTabClick = (tab) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const {
    ingredients,
  } = useSelector(store => store)

  function visibleCategory() {
    const ingredientsContainer = document.getElementById('container');
    const containerCoords =  ingredientsContainer.getBoundingClientRect();
    const currentElementInCat = document.elementFromPoint(containerCoords.top, containerCoords.top);
    const currentCategory = currentElementInCat.closest('ul');
    return setCurrentTab(currentCategory.id);
  }

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

      <div className={BurgerIngredientsStyles.ingredientsContainer} id="container" onScroll={visibleCategory}>

        <ul className={BurgerIngredientsStyles.ingredientList} id="buns">
          <h2 className={BurgerIngredientsStyles.h2}>Булки</h2>
          {ingredients
            .filter((item) => item.type === 'bun')
            .map((ingredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={props.handleOpenIngredient} />
              )
            })
          }
        </ul>

        <ul className={BurgerIngredientsStyles.ingredientList} id="sauces">
          <h2 className={BurgerIngredientsStyles.h2} >Соусы</h2>
          {ingredients
            .filter((item) => item.type === 'sauce')
            .map((ingredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={props.handleOpenIngredient} />
              )
            })
          }
        </ul>

        <ul className={BurgerIngredientsStyles.ingredientList} id="mains">
          <h2 className={BurgerIngredientsStyles.h2} >Начинки</h2>
          {ingredients
            .filter((item) => item.type === 'main')
            .map((ingredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={props.handleOpenIngredient} />
              )
            })
          }
        </ul>

      </div>

    </section>
  );
}

BurgerIngredients.propTypes = {
  handleOpenIngredient: PropTypes.func.isRequired
};

export default BurgerIngredients;
