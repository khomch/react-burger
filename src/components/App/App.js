import React, { useEffect, useState, useCallback } from 'react';
import AppStyles from './App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';


const URL = "https://norma.nomoreparties.space/api/ingredients";

function App() {

  // стейт с ингредиентами из АПИ
  const [ingredientsData, setIngredientsData] = useState([]);
  // стейт с ингредиентами (кроме булок)
  const [choosenIndredients, setChoosenIngredients] = useState([]);
  // стейт с булками
  const [choosenBun, setChoosenBun] = useState({});
  // стейт с ингредиентом для модального окна
  const [openIngredient, setOpenIngredient] = useState({})
  // стейт для модального окна
  const [modalState, setModalState] = useState(false)
  // стейт для открытия окна тотал
  const [totalState, setTotalState] = useState(false);
// стейт для подсчета общей суммы
  const [totalSum, setTotalSum] = useState(0);


  const handleTotalPrice = () => {
    const ingredientsPrices = choosenIndredients.map(i => i.price)
    const pricesSum = ingredientsPrices.reduce((acc, total) => acc + total, 0)
    return setTotalSum(choosenBun.price + pricesSum)
  }

  useEffect(() => {
    handleTotalPrice()
  }, [choosenIndredients, choosenBun])
  


  // хэндлер открытия ингредиента
  const handleOpenIngredient = (e) => {
    const ingredientToOpen = ingredientsData.data.find((element) => element._id === e.currentTarget.id)
    setOpenIngredient(ingredientToOpen)
    openModal()
  }

  // хэндлер добавления ингредиента
  const handleAddIngredient = (e) => {
    const newIngredient = ingredientsData.data.find((element) => element._id === e.currentTarget.id);
    if (newIngredient.type === 'bun') {
      setChoosenBun(newIngredient)
    } else {
      setChoosenIngredients([...choosenIndredients, newIngredient]);
    }
    closeModal();
  }

  // закрываем модальное окно по esc
  const escFunction = useCallback((event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    return () => {
      document.removeEventListener("keydown", escFunction);
    };
  }, [escFunction]);


    // хэндлер открытия окна
    const openModal = () => {
      setModalState(true)
    }

  // хэндлер закрытия окна
  const closeModal = () => {
    setModalState(false)
    setOpenIngredient({})
    setTotalState(false)

  }

  // хэндлер закрытия по клику на оверлэй
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  // хэндлер открытия тотала 
  const handleTotalClick = () => {
    setTotalState(true);
    openModal();
  }

  // получаем данные при загрузке
  useEffect(() => {
    function fetchData() {
      return fetch(URL)
        .then(res => res.json())
        .then(data => setIngredientsData(data))
        .catch(err => console.log(err));
    }
    fetchData()
  }, [])

  return (
    <div className={AppStyles.app}>
      <AppHeader />

      {openIngredient
        &&
        <IngredientDetails
          ingredientData={openIngredient}
          closeModal={closeModal}
          modalState={modalState}
          handleOverlayClick={handleOverlayClick}
          handleAddIngredient={handleAddIngredient}
        />}

      {totalState 
        && <OrderDetails
        openModal={openModal}
        closeModal={closeModal}
        modalState={modalState}
        handleOverlayClick={handleOverlayClick}
      />}


      <main className={AppStyles.main}>
        <h1 className={`text text_type_main-large ${AppStyles.h1}`}>
          Соберите бургер
        </h1>
        <section className={AppStyles.burgers}>
          {!ingredientsData.data
            ?
            "Загрузка..."
            :
            <BurgerIngredients data={ingredientsData.data} handleAddIngredient={handleAddIngredient} handleOpenIngredient={handleOpenIngredient} />}

          {!choosenBun.name && !choosenIndredients[0]
            ?
            <div className={AppStyles.chooseIngredient}><p className="text text_type_main-large">Выберите ингредиент</p></div>
            :
            <BurgerConstructor bun={choosenBun} ingredients={choosenIndredients} handleTotalClick={handleTotalClick} totalSum={totalSum}/>}
        </section>

      </main>
    </div>
  );
}

export default App;
