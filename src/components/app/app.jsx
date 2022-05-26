import React, { useEffect } from 'react';
import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { HomePage, Login, Register, ForgotPassword, Profile, ResetPassword } from '../../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useSelector, useDispatch } from 'react-redux';
import {
    setIfDirectEnter,
} from '../../services/actions/entrance';


function App() {
    const dispatch = useDispatch();

    const {
        directEnter
    } = useSelector(store => store.enter)

    useEffect(() => {
        if (window.performance.navigation.type === 1) {
            dispatch(setIfDirectEnter(false));
        }
    }, [dispatch])


    return (
        <Router>
            <div className={AppStyles.app}>

                <AppHeader />

                <main className={AppStyles.main}>

                    <Switch>

                        <Route path="/login" exact={true}>
                            <Login />
                        </Route>
                        <Route path="/register" exact={true}>
                            <Register />
                        </Route>
                        <Route path="/forgot-password" exact={true}>
                            <ForgotPassword />
                        </Route>
                        <Route path="/reset-password" exact={true}>
                            <ResetPassword />
                        </Route>

                        <ProtectedRoute path="/profile" exact={true}>
                            <Profile />
                        </ProtectedRoute>

                        <ProtectedRoute path="/feed" exact={true}>
                        </ProtectedRoute>

                        {directEnter
                            &&
                            <Route
                                path='/ingredients/:id' exact={true}>
                                <IngredientDetails  />
                            </Route>}

                        <Route path={"/"}>
                            <HomePage />
                        </Route>

                    </Switch>

                </main>
            </div>
        </Router >
    );
}

export default App;