import React, { useCallback, useState } from 'react';
import styles from './authorization.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../services/actions/auth';

export const ForgotPassword = () => {
    const dispatch:any = useDispatch();
    const history = useHistory();

    const {
        forgotPasswordSuccess
    }: any = useSelector<any>(store => store.auth)

    const [form, setValue] = useState({ email: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleForgotPassword = useCallback(
        e => {
            e.preventDefault();
            dispatch(forgotPassword(form.email));
        },
        [dispatch, form]
    );

    if (forgotPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/reset-password', state: { from: history.location.pathname }
                }}
            />
        );
    }

    return (
        <section className={styles.container}>

            <form className={styles.form} onSubmit={handleForgotPassword}>
                <h1 className={`text text_type_main-medium ${styles.h1}`}>
                    Восстановление пароля
                </h1>
                <div className={styles.input}>
                    <Input type={'email'} placeholder="Укажите Email" name="email" size={'default'} onChange={onChange} value={form.email} />
                </div>
                <div className={styles.button}>
                    <Button type="primary" size="medium">
                        Восстановить
                    </Button>
                </div>
                <p className="text text_type_main-default">Вспомнили пароль? <Link to={'/login'} className={styles.textButton}>Войти</Link></p>

            </form>

        </section>
    );
}