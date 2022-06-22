import React, { useEffect } from 'react';
import AppStyles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { HomePage, Login, Register, ForgotPassword, Profile, ResetPassword } from '../../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';
import { useDispatch } from 'react-redux';
import {
  getIngredients
} from '../../services/actions/ingredients';


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  return (
    <Router>
      <div className={AppStyles.app}>

        <AppHeader />

        <main className={AppStyles.main}>

          <Switch>

            <Route path="/login" exact={true} children={<Login />} />
            <Route path="/register" exact={true} children={<Register />} />
            <Route path="/forgot-password" exact={true} children={<ForgotPassword />} />
            <Route path="/reset-password" exact={true} children={<ResetPassword />} />
            <ProtectedRoute path="/profile" exact={true} children={<Profile />} />
            <ProtectedRoute path="/feed" exact={true} children={<></>} />
            <Route path={"/"} children={<HomePage />} />

          </Switch>

        </main>
      </div>
    </Router >
  );
}