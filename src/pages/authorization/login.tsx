import React, { useState, useCallback, useEffect } from 'react';
import styles from './authorization.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { login, getUser } from '../../services/actions/auth';


export function Login() {
    const location: { state: { from: string } }  = useLocation();
    const {
        user,
        getUserRequest
    }:any = useSelector<any>(store => store.auth)

    const dispatch = useDispatch();

    const [form, setValue] = useState<{email: string, password: string}>({ email: '', password: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = useCallback(
        e => {
            e.preventDefault();
            dispatch(login(form));
        },
        [dispatch, form]
    );

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    if (user.email && location.state) {
        return (
            <Redirect
                to={{
                    pathname: location.state.from
                }}
            />
        );
    }

    if (user.email && !location.state) {
        return (
            <Redirect
                to={{
                    pathname: '/'
                }}
            />
        );
    }

    if (getUserRequest) {
        return (
            <p className={`text text_type_main-default ${styles.container}`}>Загрузка</p>
        );
    }

    return (

        <section className={styles.container}>

            <form className={styles.form} onSubmit={handleLogin}>
                <h1 className={`text text_type_main-medium ${styles.h1}`}>
                    Вход
                </h1>
                <div className={styles.input}>
                    <Input placeholder="Email" name="email" size={'default'} onChange={onChange} value={form.email} />
                </div>
                <div className={styles.input}>
                    <PasswordInput name="password" onChange={onChange} value={form.password} />
                </div>
                <div className={styles.button}>
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </div>
                <p className="text text_type_main-default">Вы — новый пользователь? <Link to={'/register'} className={styles.textButton}>Зарегистрироваться</Link></p>
                <p className="text text_type_main-default">Забыли пароль? <Link to={'/forgot-password'} className={styles.textButton}>Восстановить пароль</Link></p>

            </form>

        </section>
    );
}