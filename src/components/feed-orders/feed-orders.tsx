import styles from './feed-orders.module.css';
import { useSelector } from '../../utils/hooks';
import { FeedOrderCard } from '../feed-order-card/feed-order-card';

export const FeedOrders = () => {

  const {
    ordersFeed,
  }: any = useSelector(store => store.ws)

  return (
    <section className={styles.feedOrdersContainer}>
      {ordersFeed && ordersFeed.orders.map((order: any, index: number) => {
        return <FeedOrderCard order={order} key={index} index={index} />
      })}
    </section>
  )
}