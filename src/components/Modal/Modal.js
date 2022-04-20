import React from 'react';
import * as ReactDOM from 'react-dom';
import ModuleStyles from './Modal.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalRoot = document.getElementById('root');

class Modal extends React.Component {

    render() {
        

        return ReactDOM.createPortal(
            <>
                <div className={this.props.modalState === true ? ModuleStyles.modal : ModuleStyles.modalHidden} onClick={this.props.handleOverlayClick}>
                    <div className={ModuleStyles.modalContent}>
                        <div className={ModuleStyles.closeIcon} onClick={this.props.closeModal}><CloseIcon type="primary" /></div>
                        {this.props.children}</div>

                </div>
                <ModalOverlay modalState={this.props.modalState}/>
            </>
            ,
            modalRoot
        );
    }
}


export default Modal;