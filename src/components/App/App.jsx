import React from 'react';
import AppStyles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { HomePage, Login, Register, ForgotPassword, Profile, ResetPassword } from '../../pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route/protected-route';


function App() {
  return (
    <Router>
      <div className={AppStyles.app}>

        <AppHeader />

        <main className={AppStyles.main}>

          <Switch>
            <Route path="/" exact={true}>
              <HomePage />
            </Route>
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

          </Switch>

        </main>
      </div>
    </Router>
  );
}

export default App;