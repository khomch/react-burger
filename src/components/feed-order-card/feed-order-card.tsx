import styles from './feed-order-card.module.css';
import { useSelector } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setDateAndTime } from '../../utils/set-order-date-and-time';
import { useHistory, useLocation, useRouteMatch } from 'react-router';
import { IOrderFromServer, TIngredient } from '../../utils/types';
import { FC, useEffect, useState } from 'react';

interface IFeedOrderCard {
    order: IOrderFromServer,
    index: number
}

export const FeedOrderCard: FC<IFeedOrderCard> = ({ order, index }) => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();
    const maxIngredients = 5;

    const [orderState, setOrderState] = useState<IOrderFromServer | null>(null)
    useEffect(() => {
        setOrderState(order)

        return () => {
            setOrderState(null)
        }
    }, [order])

    const {
        ingredients,
    } = useSelector(store => store.ingredientsStore)

    const orderIngredients: TIngredient[] = order.ingredients.map((i: string) => ingredients.filter((ingredient: TIngredient) => ingredient._id === i)).flat()
    const orderPriceWithoutBun = orderIngredients.filter((ingr: TIngredient) => ingr.type !== 'bun').map((i: TIngredient) => i.price).reduce(function (previousValue: number, currentValue: number) {
        return previousValue + currentValue;
    }, 0)
    const bunPrice = orderIngredients.find((ingr: TIngredient) => ingr.type === 'bun') ? orderIngredients?.find((ingr: TIngredient) => ingr.type === 'bun')?.price : 0;
    const orderPrice = bunPrice && orderPriceWithoutBun + (bunPrice * 2)

    const handleFeedOrderCardClick = (e: { currentTarget: { id: string; } }) => {
        const orderNumber: string = e.currentTarget.id
        history.push({
            pathname: `${match.url.slice(-1) === '/' ? match.url : `${match.url}/`}${orderNumber}`,
            state: { background: location }
        })
    }



    if (orderState === null) {
        return (

            <h2 className={styles.h2}>Загрузка...</h2>
        )
    }
    return (
        orderState &&
        <div className={styles.feedOrderCard} key={index} id={orderState.number} onClick={handleFeedOrderCardClick}>
            <div className={styles.numberAndTime}>
                <span className={'text text_type_digits-default'}>{`#${orderState.number}`}</span>
                <span className={'text text_type_main-default text_color_inactive'}>{setDateAndTime(order.createdAt)}</span>
            </div>
            <h2 className={styles.h2}>{orderState.name}</h2>
            <div className={styles.imagesAndPriceContainer}>
                <ul className={styles.imagesContainer} >
                    {orderState.ingredients.slice(0, maxIngredients).map((ingredientId: string, i: number) => {
                        let zIndex = maxIngredients - i;
                        let right = 20 * i;
                        return (
                            <li
                                className={styles.imageWithBorder}
                                key={i}
                                style={{ zIndex: zIndex, right: right }}
                            >
                                <img className={styles.image} src={ingredients.find((ingr) => ingredientId === ingr._id)?.image} alt={ingredients.find((i) => ingredientId === i._id)?.name} />
                            </li>

                        )
                    })}
                    {orderIngredients.flat()[5] && <li className={styles.imageWithBorderLastOneConteiner}>
                        <div className={`${styles.imageWithBorder} ${styles.imageWithBorder}`}
                            style={{ zIndex: 0, right: 100 }}><img className={`${styles.image} ${styles.imageLastOne}`} src={orderIngredients.flat()[5].image} alt={orderIngredients.flat()[5].name} /></div>
                        <div
                            className={`text text_type_digits-default ${styles.ingredientsCount}`}
                            style={{ zIndex: 0, right: 115 }}
                        >{`+${orderIngredients.flat().slice(5).length}`}</div>
                    </li>}
                </ul>
                <span></span>

                <div className={styles.priceContainer}>
                    <span className='text text_type_digits-default'>{`${orderPrice} `}</span>
                    <span className={styles.icon}><CurrencyIcon type={'primary'} /></span>
                </div>

            </div>

        </div>
    )
}