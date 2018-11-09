import {calculateNextPosition, calculateRaysRoute, distance} from "../utils/formula";
import {moveObjects} from "../actions/PlayerActions";
import {SET_ROUTE} from "../actions/GameActions";
import {Animated} from "react-native";

const isLastBallPosition = (toRouteInd, route) => {
    return route.length === toRouteInd + 3;
};

const moveBalls = (state, action) => {
    let {route, toRouteInd} = state;
    if (route.length === toRouteInd + 1) {
        return {
            ...state,
            switchLevel: true
        }
    } else {
        const ballToPosition = {x: route[toRouteInd + 1].x - 10, y: route[toRouteInd + 1].y - 10};

        return {
            ...state,
            ballToPosition,
            toRouteInd: ++toRouteInd
        };
    }
};

export default moveBalls;


export const startFire = (state, action) => {
    let {route, toRouteInd} = state;
    if (route.length == 0) {
        console.error("Route is empty");
        return state;
    }
    const ballToPosition = {x: route[toRouteInd + 1].x - 10, y: route[toRouteInd + 1].y - 10};
    return {
        ...state,
        ballToPosition,
        fireTo: action.payload,
        toRouteInd: 1,
        fire: true,
        position: {x: 0, y: 0},
    };
};


export const stopFire = (state) => {
    const ballToPosition = {x: state.playerPosition.x - 10, y: state.playerPosition.y - 10};
    return {
        ...state,
        ballToPosition,
        toRouteInd: 0,
        fire: false,
    };
};
export const nextLevel = (state, action) => {
    return {
        ...state,
        level: state.level + 1,
        route: [],
        fire: false,
        playerPosition: {x: action.payload.x + 10, y: action.payload.y + 10},
        position: {x: 0, y: 0},
        toRouteInd: 0,
        switchLevel: false
    };
};

export const setRoute = (state, action) => {
    if (!action.payload) return state;
    const {fromPoint, toPoint, playground, boxes} = action.payload;
    const route = calculateRaysRoute(fromPoint, toPoint, playground, boxes);


    return {
        ...state,
        toRouteInd: 0,
        route
    };
};
