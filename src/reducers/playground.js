const initialState = {
    topLeft: {x: 0, y: 0},
    topRight: {x: 0, y: 0},
    bottomLeft: {x: 0, y: 0},
    bottomRight: {x: 0, y: 0}
};

export function playgroundReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYGROUND':
            return {...state, ...action.payload};
        default:
            return state
    }
}
