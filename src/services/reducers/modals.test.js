import { modalsReducer } from "./modals";
import {
    OPEN_MODAL,
    CLOSE_MODAL,
} from "../actions/modals-constants";

describe('modalsReducer', () => {
    it('should return the initial state', () => {
        expect(modalsReducer(undefined, {})).toEqual(
            {
                modalState: false,
            }
        )
    })
    it('should handle CLOSE_MODAL', () => {
        expect(
            modalsReducer([], {
                type: CLOSE_MODAL,
            })
        ).toEqual(
            {
                modalState: false,
            }
        )
    })
    it('should handle OPEN_MODAL', () => {
        expect(
            modalsReducer([],
                {
                    type: OPEN_MODAL,
                }
            )
        ).toEqual(
            {
                modalState: true,

            }
        )
    })
})