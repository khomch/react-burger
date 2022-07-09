import styles from './feed-orders.module.css';
import { FeedOrderCard } from '../feed-order-card/feed-order-card';
import { IOrderFromServer, IOrdersFeed } from '../../utils/types';

export const FeedOrders = ({ordersFeed}:{ordersFeed: IOrdersFeed | null}) => {

  return (
    <section className={styles.feedOrdersContainer}>
      {ordersFeed && ordersFeed.orders.map((order: IOrderFromServer, index: number) => {
        return <FeedOrderCard order={order} key={index} index={index} />
      })}
    </section>
  )
}