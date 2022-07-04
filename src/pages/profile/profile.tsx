import React, { useEffect, useState } from 'react';
import styles from './profile.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { getUser, logout, updateUser } from '../../services/actions/auth';

export const Profile = () => {
    const dispatch = useDispatch();
    const {
        user
    } = useSelector(store => store.auth)

    const [form, setValue] = useState<{name: string, login: string, password?: string}>({ name: '', login: '', password: '' });
    const [initialValue, setInitialValue] = useState<{name: string, login: string, password?: string}>({ name: '', login: '', password: '' });

    useEffect(() => {
        dispatch(getUser())
        user && setValue({ name: user.name, login: user.email })
        user && setInitialValue({ name: user.name, login: user.email })
    }, [dispatch, user])


    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

    const onClick = () => {
        dispatch(logout())
    }

    const onSaveClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setInitialValue(form)
        dispatch(updateUser(form))

    }

    const onCancelClick = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setValue(initialValue);
    }

    const compareValues = form.name === initialValue.name && form.login === initialValue.login && form.password === initialValue.password;

    return (
        <>
            <section className={styles.container}>
                <nav className={styles.nav}>
                    <ul className={styles.links}>
                        <li className={`${styles.link} text text_type_main-large ${styles.navButton} ${styles.navButtonIsActive}`}>Профиль</li>
                        <li className={styles.link}><Link to="/profile/orders" className={`text text_type_main-large ${styles.navButton}`}>История заказов</Link></li>
                        <li className={styles.link}><button onClick={onClick} className={`text text_type_main-large ${styles.navButton}`}>Выход</button></li>
                    </ul>
                    <p className='text text_type_main-default text_color_inactive'>В этом разделе вы можете изменить свои персональные данные</p>
                </nav>

                <form className={styles.form}>
                    <div className={styles.input}>
                        <Input placeholder="Имя" name="name" size={'default'} icon={'EditIcon'} value={form.name || ""} onChange={onChange} />
                    </div>
                    <div className={styles.input}>
                        <Input placeholder="Логин" name="login" size={'default'} icon={'EditIcon'} value={form.login || ""} onChange={onChange} />
                    </div>
                    <div className={styles.input}>
                        <Input placeholder="Пароль" name="password" type={'password'} size={'default'} icon={'EditIcon'} value={form.password || ""} onChange={onChange} />
                    </div>
                    <div className={styles.actions}>
                        <button onClick={onCancelClick} className={`text text_type_main-default ${styles.navButton} ${compareValues ? styles.navButtonDisabled : ""}`}>Отменить</button>
                        <Button onClick={onSaveClick} disabled={compareValues ? true : false}>Сохранить</Button>
                    </div>
                </form>

            </section>
        </>
    );
}