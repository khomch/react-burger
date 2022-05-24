import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Modal from '../modal/modal';

import {
    closeModal
} from '../../services/actions/ingredients';

export default function Modals({children}) {

    const dispatch = useDispatch();

    // хэндлер закрытия окна
    const closeModalWindow = () => {
        dispatch(closeModal());
    }

    // хэндлер закрытия по клику на оверлэй
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModalWindow();
        }
    }

    // получаем данные из стора о состоянии модального окна
    const {
        modalState,
    } = useSelector(store => store.ingredientsStore)


    return (

        <Modal
            closeModal={closeModalWindow}
            modalState={modalState}
            handleOverlayClick={handleOverlayClick}
        >
            {children}
        </Modal>

    );
}