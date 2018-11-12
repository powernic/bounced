import moveObjects from "./moveObjects";
import moveBalls, {addPoint, nextLevel, setRoute, startFire, stopFire} from "./moveBalls";
import {ADD_POINT, MOVE_BALLS, MOVE_OBJECTS, NEXT_LEVEL, START_FIRE, STOP_FIRE} from "../actions/PlayerActions";
import {SET_ROUTE} from "../actions/GameActions";
import {Animated} from "react-native";

const initialState = {
    playerPosition: {
        x: 200,
        y: 600
    },
    position: {
        x: 0,
        y: 0
    },
    fireTo: {
        x: 0,
        y: 0,
    },
    toRoutesInd: [0],
    routes: [[]],
    switchLevel: false,
    points:3,
    level: 1,
    nose: {
        points: '',
        rotate: ''
    },
    ballsAnimated: [new Animated.ValueXY({x: 190, y: 590})],
    ballsToPosition: [{x:0,y:0}],
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
        case STOP_FIRE:
            return stopFire(state, action);
        case SET_ROUTE:
            return setRoute(state, action);
        case NEXT_LEVEL:
            return nextLevel(state, action);
        case ADD_POINT:
            return addPoint(state, action);
        default:
            return state
    }
}