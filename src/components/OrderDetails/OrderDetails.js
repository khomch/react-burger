import React from 'react';
import OrderDetailsStyles from './OrderDetails.module.css';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function OrderDetails() {

    return (

            <div className={OrderDetailsStyles.orderDetails}>
                <div className={OrderDetailsStyles.container}>
                    <h2 className={`text text_type_digits-large ${OrderDetailsStyles.orderNumber}`}>058295</h2>
                    <p className={`text text_type_main-medium ${OrderDetailsStyles.orderId}`}>Идентификатор заказа</p>
                    <div className={`text text_type_main-medium ${OrderDetailsStyles.checkMarkIcon}`}><CheckMarkIcon type="primary" /></div>
                    <p className={`text text_type_main-default ${OrderDetailsStyles.startCooking}`}>Ваш заказ начали готовить</p>
                    <p className={`text text_type_main-default text_color_inactive ${OrderDetailsStyles.wait}`}>Дождитесь готовности на орбитальной станции</p>
                </div>

            </div>

    )
}

export default OrderDetails;