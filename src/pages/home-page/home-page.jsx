import React, { useCallback, useEffect, useState } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import Modals from '../../components/modals/modals'
import { Redirect, useRouteMatch, Route } from 'react-router-dom';
import {
    openSelectedIngredient,
    sendOrder,
    getIngredients,
    addSelectedIngredient,
} from '../../services/actions/ingredients';


export function HomePage() {

    const { url, path } = useRouteMatch();
    console.log(path)

    const dispatch = useDispatch();

    // получаем данные из стора
    const {
        ingredients,
        selectedIngredients,
        selectedBun,
        currentIngredient,
        order
    } = useSelector(store => store.ingredientsStore)


    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    const addIngredient = useCallback((e) => {
        dispatch(addSelectedIngredient(e));
    }, [dispatch])

    const [ingredientToOpen, setIngredientToOpen] = useState('')
    // хэндлер открытия ингредиента
    const handleOpenIngredient = (e) => {
        console.log(e.currentTarget.id)
        dispatch(openSelectedIngredient(e));
        setIngredientToOpen(e.currentTarget.id)
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
        <>

            <h1 className={`text text_type_main-large ${styles.h1}`}>
                Соберите бургер
            </h1>

            <section className={styles.burgers}>
                <DndProvider backend={HTML5Backend}>
                    {!ingredients[0]
                        ?
                        <p className={`text text_type_main-default`}>Загрузка</p>
                        :
                        <BurgerIngredients handleOpenIngredient={handleOpenIngredient} />
                    }

                    {
                        <BurgerConstructor handleTotalClick={handleTotalClick} />
                    }
                </DndProvider>
            </section>

            <Modals >
                {Object.keys(currentIngredient).length !== 0
                    &&
                    <IngredientDetails
                        ingredientData={currentIngredient}
                        handleAddIngredient={addIngredient}
                    />

                }
                {Object.keys(order).length !== 0
                    && <OrderDetails
                    />}
            </Modals>
        </>
    );
}