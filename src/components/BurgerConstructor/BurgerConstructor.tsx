import React from 'react';
import BurgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'




function BurgerConstructor(props: any) {

  return (
    <section className={BurgerConstructorStyles.constr}>


      <div className={BurgerConstructorStyles.constrContainer}>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-end', width: '100%' }}>

          <div className={BurgerConstructorStyles.outside}>
            <div className={BurgerConstructorStyles.iconOutside}><DragIcon type="primary" /></div>

            <ConstructorElement
              type="top"
              isLocked={true}
              text={"Краторная булка N-200i (верх)"}
              price={200}
              thumbnail={props.data[0].image}
            />

          </div>

          <div className={BurgerConstructorStyles.toppingsWindow}>

            <div className={BurgerConstructorStyles.inside}>
              <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>

              <ConstructorElement
                text={props.data[1].name}
                price={props.data[1].price}
                thumbnail={props.data[1].image}
              />
            </div>

            <div className={BurgerConstructorStyles.inside}>
              <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>

              <ConstructorElement
                text={props.data[2].name}
                price={props.data[2].price}
                thumbnail={props.data[2].image}
              />
            </div>

            <div className={BurgerConstructorStyles.inside}>
              <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>

              <ConstructorElement
                text={props.data[3].name}
                price={props.data[3].price}
                thumbnail={props.data[3].image}
              />
            </div>

            <div className={BurgerConstructorStyles.inside}>
              <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>

              <ConstructorElement
                text={props.data[4].name}
                price={props.data[4].price}
                thumbnail={props.data[4].image}
              />
            </div>

            <div className={BurgerConstructorStyles.inside}>
              <div className={BurgerConstructorStyles.icon}><DragIcon type="primary" /></div>

              <ConstructorElement
                text={props.data[5].name}
                price={props.data[5].price}
                thumbnail={props.data[5].image}
              />
            </div>

          </div>


          <div className={BurgerConstructorStyles.outside}>
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text="Краторная булка N-200i (низ)"
              price={200}
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

      </div>




    </section>
  );
}

export default BurgerConstructor;
