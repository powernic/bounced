import moveObjects from "./moveObjects";
import moveBalls, {setRoute, startFire} from "./moveBalls";
import {MOVE_BALLS, MOVE_OBJECTS, START_FIRE} from "../actions/PlayerActions";
import {SET_ROUTE} from "../actions/GameActions";

const initialState = {
    playerPosition: {
        x: 200,
        y: 600
    },
    position: {
        x: 0,
        y: 0
    },
    passedRouteInd:0,
    route:[],
    ball: {
        x: 0,
        y: 0
    },
    fire: false
};

export function playerReducer(state = initialState, action) {
    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case MOVE_BALLS:
            return moveBalls(state, action);
        case START_FIRE:
            return startFire(state, action);
        case SET_ROUTE:
            return setRoute(state, action);
        default:
            return state
    }
}