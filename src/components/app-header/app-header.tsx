import React from 'react';
import AppHeaderStyles from './app-header.module.css';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useRouteMatch } from 'react-router-dom';


export const AppHeader = () => {
  
  const isConstructor = useRouteMatch({ path: "/", exact: true });
  const isFeed = useRouteMatch("/feed");
  const isProfile = useRouteMatch("/profile");

  return (
    <header className={AppHeaderStyles.header}>
      <nav className={AppHeaderStyles.nav}>

        <ul className={AppHeaderStyles.links}>

          <li className={AppHeaderStyles.links__item}>
            <BurgerIcon
              type={isConstructor ? "primary" : "secondary"} />
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
              type={isFeed ? "primary" : "secondary"} />
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
            type={isProfile ? "primary" : "secondary"} />
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
