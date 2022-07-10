import styles from './feed-orders.module.css';
import { FeedOrderCard } from '../feed-order-card/feed-order-card';
import { IOrderFromServer, IOrdersFeed } from '../../utils/types';
import { useEffect, useState } from 'react';

export const FeedOrders = ({ ordersFeed }: { ordersFeed: IOrdersFeed | null }) => {
  const [orders, setOrders] = useState<IOrdersFeed | null>(null)
  
  useEffect(() => {
    setOrders(ordersFeed)

    return () => {
      setOrders(null)
    }
  }, [ordersFeed])

  if (!orders) {
    return (
      <section className={styles.feedOrdersContainer}>
        Загрузка...
      </section>
    )
  }

  if (orders) {
    return (
      <section className={styles.feedOrdersContainer}>
        {orders && orders.orders.map((order: IOrderFromServer, index: number) => {
          return <FeedOrderCard order={order} key={index} index={index} />
        })}
      </section>
    )
  }
  else return <></>

}