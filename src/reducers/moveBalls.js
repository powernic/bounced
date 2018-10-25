import {calculateNextPosition, calculateRaysRoute, distance} from "../utils/formula";
import {moveObjects} from "../actions/PlayerActions";
import {SET_ROUTE} from "../actions/GameActions";
import {Animated} from "react-native";


const moveBalls = (state, action) => {
    let {route, passedRouteInd} = state;
    if (!((passedRouteInd + 2) + '' in route)) {
        const position = {x:state.playerPosition.x-10,y:state.playerPosition.y-10};
        const ballAnimated = {
            from:new Animated.ValueXY(position),
            to:new Animated.ValueXY(position)
        };
        return {
            ...state,
            ballAnimated,
            passedRouteInd: 0,
            fire: false,
        };
    }
    const ballAnimated = {
        from: new Animated.ValueXY({x: route[passedRouteInd + 1].x - 10, y: route[passedRouteInd + 1].y - 10}),
        to: new Animated.ValueXY({x: route[passedRouteInd + 2].x - 10, y: route[passedRouteInd + 2].y - 10})
    };
    return {
        ...state,
        ballAnimated,
        passedRouteInd: ++passedRouteInd
    };
    /*if (!((passedRouteInd + 1) + '' in route)) {
        const ball = state.playerPosition;
        return {
            ...state,
            ball,
            passedRouteInd: 0,
            fire: false,
        };
    }
    let nextRoutePoint = route[passedRouteInd + 1];
    let bounceOff = false;
    let ball = nextRoutePoint;
    if (bounceOff) {
        return {
            ...state,
            ball,
            passedRouteInd: ++passedRouteInd
        };
    } else {
        return {
            ...state,
            ball
        };
    }*/
};

export default moveBalls;


export const startFire = (state, action) => {
    let {route, passedRouteInd} = state;
    const ballAnimated = {
        from:new Animated.ValueXY({x:route[passedRouteInd].x-10,y:route[passedRouteInd].y-10}),
        to:new Animated.ValueXY({x:route[passedRouteInd + 1].x-10,y:route[passedRouteInd + 1].y-10})
    };
    return {
        ...state,
        ballAnimated,
        fireTo:action.payload,
        passedRouteInd: 0,
        fire: true,
    };
};


export const stopFire = (state) => {
    const position = {x:state.playerPosition.x-10,y:state.playerPosition.y-10};
    const ballAnimated = {
        from:new Animated.ValueXY(position),
        to:new Animated.ValueXY(position)
    };
    return {
        ...state,
        ballAnimated,
        passedRouteInd: 0,
        fire: false,
    };
};
export const nextLevel = (state) => {
    return {
        ...state,
        level: state.level + 1
    };
};

export const setRoute = (state, action) => {
    if (!action.payload) return state;
    const {fromPoint, toPoint, playground, boxes} = action.payload;
    const route = calculateRaysRoute(fromPoint, toPoint, playground, boxes);
    if (state.passedRouteInd > 0) {
        return {
            ...state,
            passedRouteInd: 0,
            route
        };
    } else {
        return {
            ...state,
            route
        };
    }
};
