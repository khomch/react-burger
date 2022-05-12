import React from 'react';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addDraggedIngredient } from '../../services/actions'
import DraggableCard from '../DraggableCard/DraggableCard';


function BurgerConstructor(props) {
  const { selectedBun, selectedIngredients, total } = useSelector(store => store)

  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(itemId) {
      dispatch(addDraggedIngredient(itemId))
    }
  });

  const className = `${BurgerConstructorStyles.constr} ${isHover ? BurgerConstructorStyles.isHover : ""}`

  return (
    <section className={className} ref={dropTarget}>

      {!selectedBun.name && !selectedIngredients[0]
        ?
        <div className={BurgerConstructorStyles.chooseIngredient}><p className="text text_type_main-large">Выберите ингредиент</p></div>
        :
        <div className={BurgerConstructorStyles.constrContainer} >

          <div className={BurgerConstructorStyles.outside}>

            {
              !selectedBun.name ? <p className="text text_type_main-default text_color_inactive">Выберите булку</p>
                :
                <ConstructorElement
                  type="top"
                  isLocked={true}
                  text={`${selectedBun.name} (верх)`}
                  price={selectedBun.price}
                  thumbnail={selectedBun.image}
                />}

          </div>


          <div className={BurgerConstructorStyles.toppingsWindow}>

            {selectedIngredients.map((ingredient, index) => {

              return (
                <DraggableCard ingredient={ingredient} key={ingredient.nanoid} index={index} />
              )
            })}

          </div>


          <div className={BurgerConstructorStyles.outside}>
            {selectedBun.name && <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun.name} (низ)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />}
          </div>

        </div>
      }

      {total > 0 &&
        <div className={BurgerConstructorStyles.total}>

          <p className={`text text_type_digits-medium ${BurgerConstructorStyles.totalPrice}`}>
            {total} <CurrencyIcon type="primary" />
          </p>

          <Button type="primary" size="medium" onClick={props.handleTotalClick}>
            Оформить заказ
          </Button>

        </div>}


    </section>

  );
}

BurgerConstructor.propTypes = {
  handleTotalClick: PropTypes.func.isRequired,
};


export default BurgerConstructor;
