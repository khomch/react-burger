import React, { useEffect, useState } from 'react';
import styles from './selected-order.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { IOrderFromServer, TIngredient } from '../../utils/types';
import { openModal } from '../../services/actions/modals';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setDateAndTime } from '../../utils/set-order-date-and-time';

export const SelectedOrder = ({ selectedOrder, isModal }: { selectedOrder: IOrderFromServer, isModal: boolean }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        if (isModal) {
            dispatch(openModal())
        }
    }, [isModal, dispatch])

    const {
        ingredients,
    } = useSelector(store => store.ingredientsStore)

    const orderIngredients: TIngredient[] = selectedOrder.ingredients.map((i: string) => ingredients.filter((ingredient: TIngredient) => ingredient._id === i)).flat()
    const orderPriceWithoutBun = orderIngredients.filter((ingr: TIngredient) => ingr.type !== 'bun').map((i: TIngredient) => i.price).reduce(function (previousValue: number, currentValue: number) {
        return previousValue + currentValue;
    }, 0)
    const bunPrice = orderIngredients.find((ingr: TIngredient) => ingr.type === 'bun') ? orderIngredients?.flat().find((ingr: TIngredient) => ingr?.type === 'bun')?.price : 0;
    const orderPrice = (orderPriceWithoutBun + (bunPrice ? (bunPrice * 2) : 0))

    const filteredOrder = orderIngredients.filter((item: TIngredient, index: number) => {
        return orderIngredients.indexOf(item) === index
    })

    const [order, setOrder] = useState<IOrderFromServer | null>(null)

    useEffect(() => {
        selectedOrder && setOrder(selectedOrder)
    }, [selectedOrder])



    if (order === null) {
        return (
            <div className={styles.selectedOrder}>
                Загрузка...
            </div>
        )
    }

    if (order) {
        return (
            <div className={styles.selectedOrder}>
                <div className={styles.container}>
                    <p className={`text text_type_digits-default ${styles.number}`}>{`# ${selectedOrder.number}`}</p>
                    <h2 className={`text text_type_main-medium ${styles.title}`}>{selectedOrder.name}</h2>
                    <p className={`text text_type_main-small ${styles.status}`}>{selectedOrder.status === 'done' ? 'Выполнен' : "В работе"}</p>
                    <p className={`text text_type_main-medium`}>Состав:</p>
                    <ul className={styles.list}>
                        {filteredOrder.map((ingredient: TIngredient, index: number) => {
                            const ingredientQty = orderIngredients.filter((ingr: TIngredient) => ingr._id === ingredient._id).length
                            return (<li className={styles.item} key={index}>
                                <div className={styles.imageAndName}>
                                    <div className={styles.imageWithBorder}>
                                        <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
                                    </div>
                                    <span className={`text text_type_main-default ${styles.ingredientName}`}>{ingredient.name}</span>
                                </div>
                                <div className={styles.qtyAndPrice}>
                                    <p className={`text text_type_digits-default`}>{ingredient.type === 'bun' ? 2 : ingredientQty}</p>
                                    <p className={`text text_type_main-default text text_type_digits-default`}>{` x ${ingredient.price} `}</p>
                                    <span className={styles.icon}><CurrencyIcon type={'primary'} /></span>
                                </div>
                            </li>)
                        })}
                    </ul>
                    <div className={styles.timeAndTotalPrice}>
                        <span className={`text text_type_main-default text_color_inactive`}>{setDateAndTime(selectedOrder.createdAt)}</span>
                        <span className={`text text_type_digits-medium`}>{`${orderPrice} `}<CurrencyIcon type={'primary'} /></span>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }
}