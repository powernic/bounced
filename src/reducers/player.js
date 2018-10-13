const initialState = {
    corners: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0
    },
    angles: {
        topLeft: 0,
        topRight: 0,
        bottomLeft: 0,
        bottomRight: 0
    }
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYGROUND':
            return {...state, corners: action.payload.corners,angles: action.payload.angles}

        default:
            return state
    }
}