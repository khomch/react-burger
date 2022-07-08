import styles from './feed-order-card.module.css';
import { useSelector } from '../../utils/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setDateAndTime } from '../../utils/set-order-date-and-time';
import { useHistory, useLocation, useRouteMatch } from 'react-router';

export const FeedOrderCard: any = ({ order, index }: any) => {
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    const {
        ingredients,
    } = useSelector(store => store.ingredientsStore)
    
    const orderIngredients: any = order.ingredients.map((i: any) => ingredients.filter((ingredient: any) => ingredient._id === i))
    const orderPriceWithoutBun = orderIngredients.flat().filter((ingr: any) => ingr.type !== 'bun').map((i: any) => i.price).reduce(function (previousValue: number, currentValue: number) {
        return previousValue + currentValue;
    }, 0)
    const bunPrice = orderIngredients.flat().find((ingr: any) => ingr.type === 'bun') ? orderIngredients.flat().find((ingr: any) => ingr.type === 'bun').price : 0;
    const orderPrice = orderPriceWithoutBun + (bunPrice * 2)

    const handleFeedOrderCardClick = (e: any) => {
        const orderNumber: string = e.currentTarget.id
        history.push({
            pathname: `${match.url.slice(-1) === '/' ? match.url : `${match.url}/`}${orderNumber}`,
            state: { background: location }
        })
    }

    return (

        <div className={styles.feedOrderCard} key={index} id={order.number} onClick={handleFeedOrderCardClick}>
            <div className={styles.numberAndTime}>
                <span className={'text text_type_digits-default'}>{`#${order.number}`}</span>
                <span className={'text text_type_main-default text_color_inactive'}>{setDateAndTime(order.createdAt)}</span>
            </div>
            <h2 className={styles.h2}>{order.name}</h2>
            <div className={styles.imagesAndPriceContainer}>
                <ul className={styles.imagesContainer} >
                    {order.ingredients.slice(0, 5).map((ingredientId: string, i: number) => {
                        return (
                            <li className={styles.imageWithBorder} key={i}>
                                <img className={styles.image} src={ingredients.find((ingr) => ingredientId === ingr._id)?.image} alt={ingredients.find((i) => ingredientId === i._id)?.name} />
                            </li>

                        )
                    })}
                    {orderIngredients.flat()[5] && <li className={styles.imageWithBorderLastOneConteiner}>
                        <div className={`${styles.imageWithBorder} ${styles.imageWithBorderLastOne}`}><img className={`${styles.image} ${styles.imageLastOne}`} src={orderIngredients.flat()[5].image} alt={orderIngredients.flat()[5].name} /></div>
                        <div className={`text text_type_digits-default ${styles.ingredientsCount}`}>{`+${orderIngredients.flat().slice(5).length}`}</div>
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