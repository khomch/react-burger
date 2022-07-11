import React, { useEffect, useState } from 'react';
import styles from './profile-form.module.css';
import { useDispatch, useSelector } from '../../utils/hooks';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUser } from '../../services/actions/auth';

export const ProfileForm = () => {
    const dispatch = useDispatch();
    const {
        user
    } = useSelector(store => store.auth)

    const [form, setValue] = useState<{name: string, login: string, password?: string}>({ name: '', login: '', password: '' });
    const [initialValue, setInitialValue] = useState<{name: string, login: string, password?: string}>({ name: '', login: '', password: '' });

    useEffect(() => {
        if (user) {
            setValue({ name: user.name, login: user.email })
            setInitialValue({ name: user.name, login: user.email })
        }
    }, [user?.name, user?.email, user])


    const onChange = (e: { target: { name: string; value: string; }; }) => {
        setValue({ ...form, [e.target.name]: e.target.value });
    };

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

    );
}