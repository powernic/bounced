import moveObjects from "./moveObjects";

const initialState = {
    position:{
        x:0,
        y:0
    }
}

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case 'MOVE_OBJECTS':
            return moveObjects(state,action);
        default:
            return state
    }
}