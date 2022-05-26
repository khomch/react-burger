import React from 'react';
import AppHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';


function AppHeader() {
  const location = useLocation();

  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>

        <ul className={AppHeaderStyles.links}>

          <li className={AppHeaderStyles.links__item}>
            <BurgerIcon
              type={location.pathname === "/" ? "primary" : "secondary"} />
            <NavLink
              to={'/'} exact={true}
              className={`${AppHeaderStyles.link__text} text text_type_main-default`}
              activeClassName={AppHeaderStyles.link__text_active}
            >
              Конструктор
            </NavLink>
          </li>

          <li className={AppHeaderStyles.links__item}>
            <ListIcon
              type={location.pathname === "/feed" ? "primary" : "secondary"} />
            <NavLink
              to={'/feed'}
              className={`${AppHeaderStyles.link__text} text text_type_main-default`}
              activeClassName={AppHeaderStyles.link__text_active}
            >
              Лента заказов
            </NavLink>
          </li>

        </ul>

        <div className={AppHeaderStyles.logo}>
          <Logo />
        </div>

        <div className={AppHeaderStyles.profile}>
          <ProfileIcon
            type={location.pathname === "/profile" ? "primary" : "secondary"} />
          <NavLink
            to={'/profile'}
            className={`${AppHeaderStyles.link__text} text text_type_main-default`}
            activeClassName={AppHeaderStyles.link__text_active}
          >
            Личный кабинет
          </NavLink>
        </div>

      </nav>
    </header>
  );
}

export default AppHeader;
