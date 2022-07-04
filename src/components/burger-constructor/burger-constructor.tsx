import React, { useState, useCallback, useEffect, FC } from 'react';
import BurgerConstructorStyles from './burger-constructor.module.css';
import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from '../../utils/hooks';
import { useDrop } from 'react-dnd';
import { addIngredient } from '../../services/actions/ingredients'
import { DraggableCard } from '../draggable-card/draggable-card';
import { TConstructorIngredient, TIngredient } from '../../utils/types';


interface IBurgerConstructor {
  handleTotalClick: () => void
};

export const BurgerConstructor: FC<IBurgerConstructor> = ({ handleTotalClick }) => {
  const { selectedBun, selectedIngredients } = useSelector(store => store.ingredientsStore)

  const [total, setTotal] = useState<number>(0)

  const dispatch = useDispatch();

  const [{ isHover }, dropTarget] = useDrop({
    accept: "ingredient",
    collect: monitor => ({
      isHover: monitor.isOver()
    }),
    drop(ingredient: TIngredient) {
      dispatch(addIngredient(ingredient))
    }
  });

  const handleTotalPrice = useCallback(() => {
    if (selectedIngredients || selectedBun) {
      const ingredientsPrices: number[] = selectedIngredients.map((i: TConstructorIngredient) => i.price)
      const pricesSum: number = ingredientsPrices.reduce((acc, total) => acc + total, 0)
      setTotal((!selectedBun?.price ? 0 : selectedBun.price * 2) + pricesSum)
    }
  }, [selectedBun, selectedIngredients])

  useEffect(() => {
    handleTotalPrice()
  }, [selectedIngredients, selectedBun, handleTotalPrice])

  const className = `${BurgerConstructorStyles.constr} ${isHover ? BurgerConstructorStyles.isHover : ""}`

  return (
    <section className={className} ref={dropTarget}>

      {!selectedBun?.name && !selectedIngredients[0]
        ?
        <div className={BurgerConstructorStyles.chooseIngredient}><p className="text text_type_main-large">Выберите ингредиент</p></div>
        :
        <div className={BurgerConstructorStyles.constrContainer} >

          <div className={BurgerConstructorStyles.outside}>

            {
              !selectedBun?.name ? <p className="text text_type_main-default text_color_inactive">Выберите булку</p>
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

            {selectedIngredients.map((ingredient: TConstructorIngredient, index: number) => {

              return (
                <DraggableCard key={ingredient.nanoid} ingredient={ingredient} index={index} />
              )
            })}

          </div>


          <div className={BurgerConstructorStyles.outside}>
            {selectedBun?.name && <ConstructorElement
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

          <Button type="primary" size="medium" onClick={handleTotalClick}>
            Оформить заказ
          </Button>

        </div>}


    </section>

  );
}