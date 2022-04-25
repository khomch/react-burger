import React from 'react';
import PropTypes from 'prop-types';
import ModalOverlayStyles from './ModalOverlay.module.css';

function ModalOverlay(props) {

    return (
        <div className={props.modalState === true ? ModalOverlayStyles.modalOverlay : ModalOverlayStyles.modalOverlayHidden}>
        </div>
    );
}

ModalOverlay.propTypes = {
    modalState: PropTypes.bool.isRequired
}

export default ModalOverlay;