import React, { useEffect } from 'react';
import { Switch, Route, useHistory, useRouteMatch, useLocation } from 'react-router-dom';
import { Modals } from '../../components/modals/modals'
import styles from './feed.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { wsConnectionStart } from '../../services/actions/ws';
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { FeedStatus } from '../../components/feed-status/feed-status';
import { SelectedOrder } from '../../components/selected-order/selected-order';
import { getOrder } from '../../services/actions/feed';

export const Feed = () => {
    
    const match = useRouteMatch();
    const history = useHistory();
    const location: { state: { background: string }, pathname: string } = useLocation();
    const findIdInUrl = history.location.pathname.slice(history.location.pathname.lastIndexOf('/') + 1);
    const orderNumber = match.path !== history.location.pathname && findIdInUrl
    const background = location.state && location.state.background;

    const {
        selectedOrder,
    }: any = useSelector(store => store.feed)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart());
        orderNumber && dispatch(getOrder(orderNumber))
    }, [dispatch, orderNumber])


    if (selectedOrder && !background && location.pathname !== ('/feed' || '/feed/')) {
        return (
            <Switch>
                <Route
                    path={`${match.path}/:number`}
                    children={() => {
                        return (
                            <SelectedOrder selectedOrder={selectedOrder[0]} isModal={false}
                            />
                        );
                    }}
                />
            </Switch>
        )
    }

    else {
        return (
            <>
                <h1 className={`text text_type_main-large ${styles.h1}`}>
                    Лента заказов
                </h1>

                <section className={styles.feed}>
                    <FeedOrders />
                    <FeedStatus />

                </section>


                {background
                    && selectedOrder
                    &&
                    <Switch>
                        <Modals >
                            <Route
                                path={`${match.path}/:number`}
                                children={() => {
                                    return (
                                        <SelectedOrder selectedOrder={selectedOrder[0]} isModal={true}
                                        />
                                    );
                                }}
                            />
                        </Modals>
                    </Switch>}


            </>
        )
    }
}
