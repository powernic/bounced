export const initialState = {
    user: {name: 'Полина'},
    score:{
        current:0,
        best:0
    },
    playground:{
        corners:{
            topLeft:0,
            topRight:0,
            bottomLeft:0,
            bottomRight:0
        },
        angles:0
    }
}

export function rootReducer(state = initialState) {
    return state
}