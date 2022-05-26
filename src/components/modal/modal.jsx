import { React, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as ReactDOM from 'react-dom';
import ModuleStyles from './modal.module.css';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('modals');

function Modal(props) {

    // закрываем модальное окно по esc
    const handlePressEsc = useCallback((event) => {
        if (event.key === 'Escape') {
            props.closeModal();
        }
    }, [props]);

    useEffect(() => {
        document.addEventListener("keydown", handlePressEsc);

        return () => {
            document.removeEventListener("keydown", handlePressEsc);
        };
    }, [handlePressEsc]);

    return ReactDOM.createPortal(
        props.children &&
        <>
            <div className={props.modalState === true ? ModuleStyles.modal : ModuleStyles.modalHidden} onClick={props.handleOverlayClick}>
                <div className={ModuleStyles.modalContent}>
                    <div className={ModuleStyles.closeIcon} onClick={props.closeModal}><CloseIcon type="primary" /></div>
                    {props.children}</div>

            </div>
            <ModalOverlay modalState={props.modalState} />
        </>
        ,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    closeModal: PropTypes.func.isRequired,
    handleOverlayClick: PropTypes.func.isRequired,
    modalState: PropTypes.bool.isRequired
};

export default Modal;