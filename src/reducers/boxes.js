import {getBlockPositions} from "../utils/formula";

const initialState =
    {
        info: {},
        positions: {}
    };

export function boxesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOXES':
            if (!action.payload) return state;
            return getBlockPositions(action.payload);
        default:
            return state
    }
}
