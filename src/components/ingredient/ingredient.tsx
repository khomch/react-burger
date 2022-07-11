import React, { FC } from 'react';
import IngredientsStyles from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { useSelector } from '../../utils/hooks';
import { useRouteMatch, useLocation, Link } from 'react-router-dom';
import { TIngredient } from '../../utils/types';

interface IIngredient {
    ingredient: TIngredient,
    handleOpenIngredient: (e: { currentTarget: { id: string; }})  => void
}

export const Ingredient: FC<IIngredient> = ({ ingredient, handleOpenIngredient }) => {
    const location = useLocation();
    const match = useRouteMatch();
    const {
        selectedBun,
        selectedIngredients
    } = useSelector(store => store.ingredientsStore)

    const handleIngredientCount = (ingr: TIngredient) => {
        const countOne = 1;
        if (ingr.type === 'bun' && ingr.name === selectedBun?.name) {
            return countOne;
        } else {
            return selectedIngredients.filter((i: TIngredient) => i.name === ingr.name).length;
        }
    }

    const [{ opacity }, dragRef] = useDrag({
        type: "ingredient",
        item: ingredient,
        collect: monitor => ({
            opacity: monitor.isDragging() ? 0.2 : 1
        })
    });

    return (

        <li ref={dragRef} className={IngredientsStyles.ingredient} style={{ opacity }} key={ingredient._id} onClick={handleOpenIngredient} id={ingredient._id}>
            <Link
                to={{
                    pathname: `${match.url}ingredients/${ingredient._id}`,
                    state: { background: location }
                }}><img className={IngredientsStyles.image} src={ingredient.image} alt={ingredient.name} /></Link>
            {handleIngredientCount(ingredient) > 0 && <Counter count={handleIngredientCount(ingredient)} size="default" />}
            <p className={`${IngredientsStyles.price} text text_type_digits-default`}>{ingredient.price} <CurrencyIcon type="primary" /></p>
            <p className={`${IngredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
        </li >

    )
}