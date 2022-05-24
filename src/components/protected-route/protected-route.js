import { Route, Redirect } from 'react-router-dom';
import { useEffect } from 'react';
import { getUser } from '../../services/actions/auth';
import { useSelector, useDispatch } from 'react-redux';

export function ProtectedRoute({ children, ...rest }) {
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
                user.name ? (
                    children
                ) : (
                    <Redirect
                        to='/login'
                    />
                )
            }
        />
    );
}


