import React from 'react';
import AppHeaderStyles from './AppHeader.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'




function AppHeader() {
  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>
      <ul className={AppHeaderStyles.links}>
        <li className={AppHeaderStyles.links__item}><BurgerIcon type="primary" /><p className={`${AppHeaderStyles.link__text} ${AppHeaderStyles.link__text_active} text text_type_main-default`}>Конструктор</p></li>
        <li className={AppHeaderStyles.links__item}><ListIcon type="secondary" /><p className={`${AppHeaderStyles.link__text} text text_type_main-default`}>Лента заказов</p></li>
      </ul>
        <div className={AppHeaderStyles.logo}><Logo /></div>
        <div className={AppHeaderStyles.profile}><ProfileIcon type="secondary" /><p className={`${AppHeaderStyles.link__text} text text_type_main-default`}>Личный кабинет</p></div>  
      </nav>
    </header>
  );
}

export default AppHeader;
