import React from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import api from '../../utils/data'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

// console.log(api)


function App() {
  return (
    <div className={AppStyles.app}>
      <AppHeader />
      <main className={AppStyles.main}>
        <h1 className={`text text_type_main-large ${AppStyles.h1}`}>
          Соберите бургер
        </h1>
        <section className={AppStyles.burgers}>
          <BurgerIngredients data={api}/>
          <BurgerConstructor data={api}/>
        </section>
        
      </main>
    </div>
  );
}

export default App;
