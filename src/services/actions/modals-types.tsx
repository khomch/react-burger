import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from './modals-constants'


export interface ICloseModal {
    readonly type: typeof CLOSE_MODAL,
};

export interface IOpenModal {
    readonly type: typeof OPEN_MODAL,
};

export type TModalsActions =
    | IOpenModal
    | ICloseModal