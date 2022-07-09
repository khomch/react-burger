import React, { useState, FC } from 'react';
import BurgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import { Ingredient } from '../ingredient/ingredient';
import { TIngredient } from '../../utils/types';


interface IBurgerIngredients {
  handleOpenIngredient: (e: { currentTarget: { id: string; }}) => void
}

export const BurgerIngredients: FC<IBurgerIngredients> = ({ handleOpenIngredient }) => {
  // стейт для переключения табов
  const [currentTab, setCurrentTab] = useState<string>('buns');
  // функция переключения таба
  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const {
    ingredients,
  } = useSelector(store => store.ingredientsStore)

  const visibleCategory = () => {
    const ingredientsContainer = document.getElementById('container') as HTMLElement;
    const containerCoords = ingredientsContainer?.getBoundingClientRect() as DOMRect;
    const currentElementInCat = document?.elementFromPoint(containerCoords?.top, containerCoords?.top);
    const currentCategory = currentElementInCat?.closest('ul') as HTMLElement;
    setCurrentTab(currentCategory.id);
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
          {ingredients?.filter((item: TIngredient) => item.type === 'bun')
            .map((ingredient: TIngredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={handleOpenIngredient} />
              )
            })
          }
        </ul>

        <ul className={BurgerIngredientsStyles.ingredientList} id="sauces">
          <h2 className={BurgerIngredientsStyles.h2} >Соусы</h2>
          {ingredients?.filter((item: TIngredient) => item.type === 'sauce')
            .map((ingredient: TIngredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={handleOpenIngredient} />
              )
            })
          }
        </ul>

        <ul className={BurgerIngredientsStyles.ingredientList} id="mains">
          <h2 className={BurgerIngredientsStyles.h2} >Начинки</h2>
          {ingredients?.filter((item: TIngredient) => item.type === 'main')
            .map((ingredient: TIngredient) => {
              return (
                <Ingredient key={ingredient._id} ingredient={ingredient} handleOpenIngredient={handleOpenIngredient} />
              )
            })
          }
        </ul>

      </div>

    </section>
  );
}
