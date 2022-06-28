import React, { useState, useCallback } from 'react';
import styles from './authorization.module.css';
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/actions/auth';

export const ResetPassword = ():any => {

    const dispatch = useDispatch();

    const {
        resetPasswordSuccess
    }: any = useSelector<any>(store => store.auth)

    const history: { location: { state: { pathname: string, from: string } } } = useHistory();

    const [form, setValue] = useState({ password: '', token: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleResetPassword = useCallback(
        e => {
            e.preventDefault();
            dispatch(resetPassword(form));
        },
        [dispatch, form]
    );

    if (resetPasswordSuccess) {
        return (
            <Redirect
                to={{
                    pathname: '/login'
                }}
            />
        );
    }

    if (!history.location.state) {
        return (
            <Redirect
                to={{
                    pathname: '/forgot-password'
                }}
            />
        );
    }

    if (history.location.state.from === "/forgot-password") {

        return (
            <section className={styles.container}>

                <form className={styles.form} onSubmit={handleResetPassword}>
                    <h1 className={`text text_type_main-medium ${styles.h1}`}>
                        Восстановление пароля
                    </h1>
                    <div className={styles.input} >
                        <PasswordInput name="password" onChange={onChange} value={form.password} />
                    </div>
                    <div className={styles.input} >
                        <Input placeholder="Введите код из письма" size={'default'} name="token" onChange={onChange} value={form.token} />
                    </div>
                    <div className={styles.button}>
                        <Button type="primary" size="medium">
                            Сохранить
                        </Button>
                    </div>
                    <p className="text text_type_main-default">Вспомнили пароль? <Link to={'/login'} className={styles.textButton}>Войти</Link></p>

                </form>

            </section>
        );
    }

}