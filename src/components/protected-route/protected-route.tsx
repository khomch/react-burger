import { useEffect, FC } from 'react';
import { Route, Redirect, useLocation, RouteProps } from 'react-router-dom';
import { getUser } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const location = useLocation();
    const {
        user
    }:any = useSelector<any>(store => store.auth)

    const dispatch:any = useDispatch();

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    return (
        <Route
            {...rest}
            render={() =>
                user.name ? (
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


