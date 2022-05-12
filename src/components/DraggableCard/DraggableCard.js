import React, { useCallback, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import DraggableCardStyles from './DraggableCard.module.css';
import { deleteIngredient } from '../../services/actions'
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { updateSelectedIngredients } from '../../services/actions';
import ingredientPropTypes from '../../utils/types';
import PropTypes from 'prop-types';

function DraggableCard({ ingredient, index }) {

    const dispatch = useDispatch();

    const handleDeleteIngredient = (e) => {
        return dispatch(deleteIngredient(e))
    }

    const moveCard = useCallback((dragIndex, hoverIndex) => {
        dispatch(updateSelectedIngredients(dragIndex, hoverIndex))
    }, [dispatch])

    const ref = useRef(null)

    const [, drop] = useDrop({
        accept: "ingr",
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            moveCard(dragIndex, hoverIndex)
            item.index = hoverIndex
        }
    })

    const [{ isDragging }, drag, preview] = useDrag({
        type: "ingr",
        item: () => {
            return { ingredient, index }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })
    const opacity = isDragging ? 0 : 1
    preview(drop(ref))

    return (
        <div ref={ref} style={{ opacity }} className={DraggableCardStyles.insideIngrediend} >
            <div className={DraggableCardStyles.icon} ref={drag}><DragIcon type="primary" /></div>
            <div className={DraggableCardStyles.inside} onClick={handleDeleteIngredient} id={ingredient.nanoid} key={ingredient.nanoid}>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                /></div>
        </div>
    )
}

DraggableCard.propTypes = {
    ingredient: ingredientPropTypes.isRequired,
    index: PropTypes.number.isRequired
  };

export default DraggableCard;