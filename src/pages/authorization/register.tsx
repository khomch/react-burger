import React, { useState, useCallback, useEffect } from 'react';
import styles from './authorization.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { registration, getUser } from '../../services/actions/auth';

export function Register() {

    const {
        user,
        getUserRequest
    }: any = useSelector<any>(store => store.auth)

    const dispatch = useDispatch();

    const [form, setValue] = useState<{ email: string, password: string, name: string }>({ email: '', password: '', name: '' });

    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const handleRegistration = useCallback(
        e => {
            e.preventDefault();
            dispatch(registration(form));
        },
        [dispatch, form]
    );

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    if (user.email) {
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

            <form className={styles.form} onSubmit={handleRegistration}>
                <h1 className={`text text_type_main-medium ${styles.h1}`}>
                    Регистрация
                </h1>
                <div className={styles.input}>
                    <Input placeholder="Имя" name="name" size={'default'} onChange={onChange} value={form.name} />
                </div>
                <div className={styles.input}>
                    <Input placeholder="Email" name="email" size={'default'} onChange={onChange} value={form.email} />
                </div>
                <div className={styles.input}>
                    <PasswordInput onChange={onChange} name="password" value={form.password} />
                </div>
                <div className={styles.button}>
                    <Button type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </div>
                <p className="text text_type_main-default">Уже зарегистрированы? <Link to={'/login'} className={styles.textButton}>Войти</Link></p>

            </form>

        </section>
    );
}