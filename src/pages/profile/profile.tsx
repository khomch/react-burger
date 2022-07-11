import styles from './profile.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Link, Route, Switch, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { logout } from '../../services/actions/auth';
import { ProfileForm } from '../../components/profile-form/profile-form';
import { FeedOrders } from '../../components/feed-orders/feed-orders';
import { useEffect } from 'react';
import { wsConnectionStartProfile, wsDisconnect } from '../../services/actions/ws';
import { getOrder } from '../../services/actions/feed';
import { Modals } from '../../components/modals/modals';
import { SelectedOrder } from '../../components/selected-order/selected-order';

export const Profile = () => {

    const dispatch = useDispatch();
    const onClick = () => {
        dispatch(logout())
    }
    const match = useRouteMatch();
    const history = useHistory();
    const location: { state: { background: string }, pathname: string } = useLocation();
    const findIdInUrl = history.location.pathname.slice(history.location.pathname.lastIndexOf('/') + 1);
    const orderNumber = match.path !== history.location.pathname && history.location.pathname !== '/profile' && findIdInUrl
    const background = location.state && location.state.background;

    const {
        ordersFeed,
    } = useSelector(store => store.ws)

    const {
        selectedOrder,
    } = useSelector(store => store.feed)


    useEffect(() => {
        if (location.pathname.includes('profile/orders') && orderNumber) {
            dispatch(wsConnectionStartProfile());
            orderNumber && dispatch(getOrder(orderNumber))
            
            return () => {
                dispatch(wsDisconnect())
           }
        }

    }, [dispatch, location.pathname, orderNumber])

    if (orderNumber && selectedOrder && !background && location.pathname !== ('/profile/orders' || '/profile/orders/')) {
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

    return (
        <>
            <section className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.links}>
                        <li className={`${styles.link} text text_type_main-large ${styles.navButton} ${styles.navButtonIsActive}`}><Link to="/profile" className={`text text_type_main-large ${styles.navButton}`}>Профиль</Link></li>
                        <li className={styles.link}><Link to="/profile/orders" className={`text text_type_main-large ${styles.navButton}`}>История заказов</Link></li>
                        <li className={styles.link}><button onClick={onClick} className={`text text_type_main-large ${styles.navButton}`}>Выход</button></li>
                    </ul>
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>

                {<Switch>
                    <Route
                        path={`${match.path}/`} exact={true}
                        children={() => {
                            return (
                                <ProfileForm />
                            );
                        }}
                    />
                </Switch>}

                {<Switch>
                    <Route
                        path={`${match.path}/orders`}
                        children={() => {
                            return (<div className={styles.feedOrders}>
                                <FeedOrders ordersFeed={ordersFeed} />
                            </div>
                            );
                        }}
                    />
                </Switch>}

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

            </section>
        </>
    );
}