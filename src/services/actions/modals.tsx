import {
    CLOSE_MODAL,
    OPEN_MODAL
} from './modals-constants'
import { ICloseModal, IOpenModal } from './modals-types'


// закрываем модалку
export const openModal = ():IOpenModal => {
    return {
        type: OPEN_MODAL
    }
}


// закрываем модалку
export const closeModal = ():ICloseModal => {
    return {
        type: CLOSE_MODAL
    }
}