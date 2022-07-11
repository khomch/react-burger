import { useEffect, FC } from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { getUser } from '../../services/actions/auth';
import { useSelector, useDispatch } from '../../utils/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const location = useLocation();
    const {
        user
    } = useSelector(store => store.auth)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <Route
            {...rest}
            render={() =>
                user?.name ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location.pathname }
                        }} />
                )
            }
        />
    );
}


