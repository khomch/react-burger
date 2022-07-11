import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from "../actions/modals-constants";
import { TModalsActions } from '../actions/modals-types';


const initialState: { modalState: boolean } = {
    modalState: false,
};


export const modalsReducer = (state: { modalState: boolean } = initialState, action: TModalsActions): { modalState: boolean } => {
    switch (action.type) {

        case CLOSE_MODAL: {
            return {
                ...state,
                modalState: false,
            }
        }

        case OPEN_MODAL: {
            return {
                ...state,
                modalState: true,
            }
        }

        default: {
            return state;
        }
    }
}
