import React from 'react';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientsPropTypes from '../../utils/types';




function BurgerConstructor(props) {

  return (
    <section className={BurgerConstructorStyles.constr}>


      <div className={BurgerConstructorStyles.constrContainer}>

        <div className={BurgerConstructorStyles.outside}>

          {!props.bun.name ? <p className="text text_type_main-default text_color_inactive">Выберите булку</p> : <ConstructorElement
            type="top"
            isLocked={true}
            text={`${props.bun.name} (верх)`}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />}

        </div>


        <div className={BurgerConstructorStyles.toppingsWindow}>

          {props.ingredients.map((ingredient) => {
            return (
              <div className={BurgerConstructorStyles.insideIngrediend} key={ingredient._id}>
                <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>
                <div className={BurgerConstructorStyles.inside}>
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                  /></div>
              </div>

            )
          })}

        </div>


        <div className={BurgerConstructorStyles.outside}>
          {props.bun.name && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${props.bun.name} (низ)`}
            price={props.bun.price}
            thumbnail={props.bun.image}
          />}
        </div>

      </div>


      <div className={BurgerConstructorStyles.total}>

        <p className={`text text_type_digits-medium ${BurgerConstructorStyles.totalPrice}`}>
          {props.totalSum} <CurrencyIcon type="primary" />
        </p>

        <Button type="primary" size="medium" onClick={props.handleTotalClick}>
          Оформить заказ
        </Button>

      </div>


    </section>

  );
}

BurgerConstructor.propTypes = ingredientsPropTypes;


export default BurgerConstructor;
