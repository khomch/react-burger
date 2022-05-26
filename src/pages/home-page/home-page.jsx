import React, { useEffect } from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import styles from './home.module.css';
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import OrderDetails from '../../components/order-details/order-details';
import Modals from '../../components/modals/modals'
import { Switch, Route, useHistory, useRouteMatch } from 'react-router-dom';
import {
    openSelectedIngredient,
    sendOrder,
    getIngredients
} from '../../services/actions/ingredients';
import {
    setIfDirectEnter,
} from '../../services/actions/entrance';

export function HomePage() {
    const match = useRouteMatch();
    const history = useHistory();
    const dispatch = useDispatch();

    // получаем данные из стора
    const {
        ingredients,
        selectedIngredients,
        selectedBun,
        currentIngredient,
        order
    } = useSelector(store => store.ingredientsStore)

    const {
        user
    } = useSelector(store => store.auth)

    const findIdInUrl = history.location.pathname.slice(history.location.pathname.lastIndexOf('/') + 1);

    useEffect(() => {
        if (ingredients.find(ingredient => ingredient._id === findIdInUrl)) {

            dispatch(openSelectedIngredient(findIdInUrl));
        }
    }, [ingredients, dispatch, findIdInUrl])

    useEffect(() => {
        dispatch(getIngredients());
    }, [dispatch])

    useEffect(() => {
        dispatch(setIfDirectEnter(false));
    }, [dispatch])


    // хэндлер открытия ингредиента
    const handleOpenIngredient = (e) => {
        dispatch(openSelectedIngredient(e.currentTarget.id));
    }

    // хэндлер открытия тотала 
    const handleTotalClick = () => {

        if (!user.email) {
            history.push('/login')
        } else {
            const choosenBunIdArray = [];
            choosenBunIdArray.splice(0, 1, selectedBun._id);
            const choosenIngredientsIdsArray = selectedIngredients.map(i => i._id);
            const ingredientsIdsArray = choosenBunIdArray.concat(choosenIngredientsIdsArray);
            dispatch(sendOrder(ingredientsIdsArray));
        }
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
                    <Switch>
                        <Route
                            path={`${match.path}ingredients/:id`}
                            children={() => {
                                return (
                                    <IngredientDetails
                                    />
                                );
                            }}
                        />


                    </Switch>
                }
                {Object.keys(order).length !== 0
                    && <OrderDetails
                    />}
            </Modals>

        </>
    );
}