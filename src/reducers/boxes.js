const initialState = [];

export function boxesReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_BOXES':
            return action.payload;
        default:
            return state
    }
}
