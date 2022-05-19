import React, { useEffect, useCallback } from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';
import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients, addSelectedIngredient, openSelectedIngredient, closeModal, sendOrder } from '../../services/actions';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';


function App() {

  // отправляем экшн
  const dispatch = useDispatch();

  // хэндлер закрытия окна
  const closeModalWindow = () => {
    dispatch(closeModal())
  }

  // хэндлер закрытия по клику на оверлэй
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModalWindow();
    }
  }

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch])

  // получаем данные из стора
  const {
    ingredients,
    selectedIngredients,
    selectedBun,
    currentIngredient,
    modalState,
    order
  } = useSelector(store => store)

  const addIngredient = useCallback((e) => {
    dispatch(addSelectedIngredient(e));
  }, [dispatch])

  // хэндлер открытия ингредиента
  const handleOpenIngredient = (e) => {
    dispatch(openSelectedIngredient(e));
  }

  // хэндлер открытия тотала 
  const handleTotalClick = () => {
    const choosenBunIdArray = [];
    choosenBunIdArray.splice(0, 1, selectedBun._id);
    const choosenIngredientsIdsArray = selectedIngredients.map(i => i._id);
    const ingredientsIdsArray = choosenBunIdArray.concat(choosenIngredientsIdsArray);
    dispatch(sendOrder(ingredientsIdsArray));
  }

  return (

    <div className={AppStyles.app}>

      <Modal
        closeModal={closeModalWindow}
        modalState={modalState}
        handleOverlayClick={handleOverlayClick}
      >
        {Object.keys(currentIngredient).length !== 0
          &&
          <IngredientDetails
            ingredientData={currentIngredient}
            handleAddIngredient={addIngredient}
          />}

        {Object.keys(order).length !== 0
          && <OrderDetails
          />}

      </Modal>

      <AppHeader />

      <main className={AppStyles.main}>

        <h1 className={`text text_type_main-large ${AppStyles.h1}`}>
          Соберите бургер
        </h1>

        <section className={AppStyles.burgers}>
          <DndProvider backend={HTML5Backend}>
            {!ingredients[0]
              ?
              <p className={`text text_type_main-default`}>Загрузка</p>
              :
              <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />}

            {

                <BurgerConstructor handleTotalClick={handleTotalClick} />
            }
          </DndProvider>
        </section>

      </main>
    </div>

  );
}

export default App;
