import React from 'react';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ingredientsPropTypes from '../../utils/types';




function BurgerConstructor(props) {

  return (
    <section className={BurgerConstructorStyles.constr}>


      <div className={BurgerConstructorStyles.constrContainer}>

        <div className={BurgerConstructorStyles.outside}>
          <div className={BurgerConstructorStyles.iconOutside}><DragIcon type="primary" /></div>

          <ConstructorElement
            type="top"
            isLocked={true}
            text={props.data[0].name}
            price={props.data[0].price}
            thumbnail={props.data[0].image}
          />

        </div>


        <div className={BurgerConstructorStyles.toppingsWindow}>

          {props.data.slice(1).map((ingredient) => {
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
      
          )})}

        </div>


        <div className={BurgerConstructorStyles.outside}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={props.data[0].name}
            price={props.data[0].price}
            thumbnail={props.data[0].image}
          />
        </div>

      </div>


      <div className={BurgerConstructorStyles.total}>

        <p className={`text text_type_digits-medium ${BurgerConstructorStyles.totalPrice}`}>
          610 <CurrencyIcon type="primary" />
        </p>

        <Button type="primary" size="medium">
          Оформить заказ
        </Button>

      </div>


    </section>
  );
}

BurgerConstructor.propTypes = ingredientsPropTypes;


export default BurgerConstructor;
