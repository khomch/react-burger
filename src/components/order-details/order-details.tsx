import React from 'react';
import OrderDetailsStyles from './order-details.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
    // получаем данные из стора
    const {
        order
    }:any = useSelector<any>(store => store.ingredientsStore)

    return (

        <div className={OrderDetailsStyles.orderDetails}>
            <div className={OrderDetailsStyles.container}>
                <h2 className={`text text_type_digits-large ${OrderDetailsStyles.orderNumber}`}>{!order.order ? "..." : order.order.number}</h2>
                <p className={`text text_type_main-medium ${OrderDetailsStyles.orderId}`}>Идентификатор заказа</p>
                <div className={`text text_type_main-medium ${OrderDetailsStyles.checkMarkIcon}`}><CheckMarkIcon type="primary" /></div>
                <p className={`text text_type_main-default ${OrderDetailsStyles.startCooking}`}>Ваш заказ начали готовить</p>
                <p className={`text text_type_main-default text_color_inactive ${OrderDetailsStyles.wait}`}>Дождитесь готовности на орбитальной станции</p>
            </div>

        </div>

    )
};