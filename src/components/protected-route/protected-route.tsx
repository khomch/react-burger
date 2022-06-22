import { useEffect, FC, ReactNode } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { getUser } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

interface IProtectedRoute {
    children: ReactNode,
    path: string,
    exact: boolean
}

export const ProtectedRoute: FC<IProtectedRoute> = ({ children, ...rest }) => {
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


