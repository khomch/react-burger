import React, { ReactNode, useCallback, FC } from 'react';
import { useSelector, useDispatch } from '../../utils/hooks';
import { useHistory } from 'react-router-dom'
import { Modal } from '../modal/modal';
import {
    closeModal
} from '../../services/actions/ingredients';

interface IModals {
    children: ReactNode
}

export const Modals: FC<IModals> = ({ children }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const close = useCallback(
        () => {
            history.replace('/')
        },
        [history]
    );

    // хэндлер закрытия окна
    const closeModalWindow = () => {
        close()
        dispatch(closeModal());

    }

    // хэндлер закрытия по клику на оверлэй
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) =>{
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