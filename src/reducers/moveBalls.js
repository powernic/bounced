import {calculateRaysRoute} from "../utils/formula";
import update from 'immutability-helper';
import {Animated} from "react-native";

const isLastBallPosition = (toRouteInd, route) => {
    return route.length === toRouteInd + 3;
};

const moveBalls = (state, action) => {
    let {routes, toRoutesInd, ballsToPosition} = state;
    /*  */
    const {key} = action;
    const route = routes[key];
    const toRouteInd = toRoutesInd[key];
    if (route.length === toRouteInd + 1) {
        return {
            ...state,
            switchLevel: true
        }
    } else {
        const newBallToPosition = {x: route[toRouteInd + 1].x - 10, y: route[toRouteInd + 1].y - 10};
        const newBallsToPosition = update(ballsToPosition, {[key]: {$set: newBallToPosition}});
        const newToRoutesInd = update(toRoutesInd, {[key]: {$set: toRouteInd + 1}});
        return {
            ...state,
            ballsToPosition: newBallsToPosition,
            toRoutesInd: newToRoutesInd
        };
    }
};

export default moveBalls;


export const startFire = (state, action) => {
    let {routes,ballsAnimated} = state;
    if (routes.length === 0) {
        console.error("Route is empty");
        return state;
    }
    const newRoutes = new Array(state.points).fill([...routes[0]]);

    const toRoutesInd = Array(newRoutes.length).fill(0);

    const ballsToPosition = newRoutes.map((route, i) => {
        return {x: route[toRoutesInd[i] + 1].x - 10, y: route[toRoutesInd[i] + 1].y - 10};
    });
    ballsAnimated = newRoutes.map((route, i) => {
        if(ballsAnimated[i]) return ballsAnimated[i];
        return new Animated.ValueXY({x: route[toRoutesInd[i]].x - 10, y: route[toRoutesInd[i]].y - 10});
    });
    const newRoutedInd = toRoutesInd.map(() => 1);

    return {
        ...state,
        ballsToPosition,
        ballsAnimated,
        fireTo: action.payload,
        routes:newRoutes,
        toRoutesInd: newRoutedInd,
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
    const {fromPoints, toPoints, playground, boxes} = action.payload;
    let routes = [];
    for (let i = 0; i < state.points; i++) {
        routes.push(calculateRaysRoute(fromPoints[i], toPoints[i], playground, boxes))
    }
    const toRoutesInd = Array(routes.length).fill(1);
    return {
        ...state,
        toRoutesInd,
        routes
    };
};
export const setStartRoute = (state, action) => {
    if (!action.payload) return state;
    const {fromPoint, toPoint, playground, boxes} = action.payload;
    let routes = [];
    const startRoute = calculateRaysRoute(fromPoint, toPoint, playground, boxes);
    routes.push(startRoute);
    return {
        ...state,
        routes
    };
};

export const addPoint = (state) => {
    return {
        ...state,
        points: state.points + 1
    };
};