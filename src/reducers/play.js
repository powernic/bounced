const initialState = {
    playground: {
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
    },
}

export function playReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PLAYGROUND':
            return {...state, playground: action.payload}

        default:
            return state
    }
}