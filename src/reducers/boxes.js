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
        case 'TOUCH_BOX':
            if (!action.payload) return state;
            const info = state.info;
            const ind = action.payload;
            let newInfo = {...info};
            newInfo[ind]--;
            if (newInfo[ind] === 0) {
                let newPositions = {...state.positions};
                delete newInfo[ind];
                delete newPositions[ind];
                return {...state, info: newInfo, positions: newPositions};
            } else {
                return {...state, info: newInfo};
            }
        default:
            return state
    }
}
