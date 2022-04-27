import React, { useContext } from 'react';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { IngredientsContext } from '../../utils/context';




function BurgerConstructor(props) {
  const { choosenIndredients, choosenBun, totalSum } = useContext(IngredientsContext)

  return (
    <section className={BurgerConstructorStyles.constr}>


      <div className={BurgerConstructorStyles.constrContainer}>

        <div className={BurgerConstructorStyles.outside}>

          {!choosenBun.name ? <p className="text text_type_main-default text_color_inactive">Выберите булку</p> : <ConstructorElement
            type="top"
            isLocked={true}
            text={`${choosenBun.name} (верх)`}
            price={choosenBun.price}
            thumbnail={choosenBun.image}
          />}

        </div>


        <div className={BurgerConstructorStyles.toppingsWindow}>

          {choosenIndredients.map((ingredient, index) => {

            return (
              <div className={BurgerConstructorStyles.insideIngrediend} key={`${ingredient._id}${index}`}>
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
          {choosenBun.name && <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${choosenBun.name} (низ)`}
            price={choosenBun.price}
            thumbnail={choosenBun.image}
          />}
        </div>

      </div>


      <div className={BurgerConstructorStyles.total}>

        <p className={`text text_type_digits-medium ${BurgerConstructorStyles.totalPrice}`}>
          {totalSum} <CurrencyIcon type="primary" />
        </p>

        <Button type="primary" size="medium" onClick={props.handleTotalClick}>
          Оформить заказ
        </Button>

      </div>


    </section>

  );
}

BurgerConstructor.propTypes = {
  handleTotalClick: PropTypes.func.isRequired,
};


export default BurgerConstructor;
