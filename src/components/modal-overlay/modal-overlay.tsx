import React, { FC } from 'react';
import PropTypes from 'prop-types';
import ModalOverlayStyles from './modal-overlay.module.css';

interface IModalOverlay {
    modalState: boolean
}

export const ModalOverlay: FC<IModalOverlay> = ({ modalState }) => {

    return (
        <div className={modalState === true ? ModalOverlayStyles.modalOverlay : ModalOverlayStyles.modalOverlayHidden}>
        </div>
    );
}

ModalOverlay.propTypes = {
    modalState: PropTypes.bool.isRequired
}