import React, { ReactNode, useCallback, useEffect, FC } from 'react';
import * as ReactDOM from 'react-dom';
import ModuleStyles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('modals') as HTMLElement;

interface IModal {
  children: ReactNode,
  closeModal: () => void,
  modalState: boolean,
  handleOverlayClick: (e: any) => void
}

export const Modal: FC<IModal> = ({ children, closeModal, modalState, handleOverlayClick }) => {

  // закрываем модальное окно по esc
  const handlePressEsc = useCallback((event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  }, [closeModal]);

  useEffect(() => {
    document.addEventListener("keydown", handlePressEsc);

    return () => {
      document.removeEventListener("keydown", handlePressEsc);
    };
  }, [handlePressEsc]);

  return ReactDOM.createPortal(
    children &&
    <>
      <div className={modalState === true ? ModuleStyles.modal : ModuleStyles.modalHidden} onClick={handleOverlayClick}>
        <div className={ModuleStyles.modalContent}>
          <div className={ModuleStyles.closeIcon} onClick={closeModal}><CloseIcon type="primary" /></div>
          {children}</div>

      </div>
      <ModalOverlay modalState={modalState} />
    </>
    ,
    modalRoot
  );
}
