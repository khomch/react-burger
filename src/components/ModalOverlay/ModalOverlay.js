import React from 'react';
import * as ReactDOM from 'react-dom';
import ModalOverlayStyles from './ModalOverlay.module.css';

const modalRoot = document.getElementById('root');

class ModalOverlay extends React.Component {

    render() {

        return ReactDOM.createPortal(
            <div className={this.props.modalState === true ? ModalOverlayStyles.modalOverlay : ModalOverlayStyles.modalOverlayHidden}>
            </div>
            ,
            modalRoot
        );
    }
}


export default ModalOverlay;