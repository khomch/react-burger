import React, { FC } from 'react';
import styles from './feed-status.module.css';
import { useSelector } from '../../utils/hooks';

export const FeedStatus: FC = () => {

  const {
    ordersFeed,
  }: any = useSelector(store => store.ws)

  const ordersReady = ordersFeed && ordersFeed.orders.filter((order: any) => order.status === 'done')
  const ordersReadyNumbers = ordersReady && ordersReady.map((order: any) => order.number)
  const ordersCreated = ordersFeed && ordersFeed.orders.filter((order: any) => order.status === 'pending')
  const ordersCreatedNumbers = ordersCreated && ordersCreated.map((order: any) => order.number)
  const ordersPending = ordersFeed && ordersFeed.orders.filter((order: any) => order.status === 'pending')
  const ordersPendingNumbers = ordersPending && ordersPending.map((order: any) => order.number)
  const ordersInProgress = ordersCreatedNumbers && ordersPendingNumbers && ordersCreatedNumbers.concat(ordersPendingNumbers)
  const uniqueOrdersInProgress = ordersInProgress && ordersInProgress.filter((element: number, index: number) => {
    return ordersInProgress.indexOf(element) === index;
  });

  return (
    ordersFeed &&
    <section className={styles.feedStatusConteiner}>
      <div className={styles.feedReadyAndInProgress}>
        <div className={styles.feedStatus}>
          <p className="text text_type_main-medium">Готовы:</p>
          <ul className={styles.feedList}>
            {ordersReadyNumbers && ordersReadyNumbers.slice(0, 5).map((number: number, index: number) => {
              return <li className={`text text_type_digits-default ${styles.feedListItemReady}`} key={index}>{number}</li>
            })}
          </ul>
        </div>
        <div className={styles.feedStatus}>
          <p className="text text_type_main-medium">В работе:</p>
          <ul className={styles.feedList}>
            {uniqueOrdersInProgress && uniqueOrdersInProgress.slice(0, 5).map((number: number, index: number) => {
              return <li className={`text text_type_digits-default ${styles.feedListItemInProgress}`} key={index}>{number}</li>
            })}
          </ul>
        </div>
      </div>

      <div className={styles.feedTotal}>
        <p className="text text_type_main-medium">Выполнено за все время:</p>
        <p className='text text_type_digits-large'>{ordersFeed.total}</p>
      </div>

      <div className={styles.feedToday}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <p className='text text_type_digits-large'>{ordersFeed.totalToday}</p>
      </div>
    </section>
  )
}