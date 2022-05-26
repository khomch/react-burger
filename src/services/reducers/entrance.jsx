import {
    DIRECT_ENTER,

} from "../actions/entrance";

const initialState = {
    directEnter: true,
};


export const enterReducer = (state = initialState, action) => {
   
    switch (action.type) {
        case DIRECT_ENTER: {
            return {
                ...state,
                directEnter: action.status,

            }
        }
        default: {
            return state;
        }
    }
}
