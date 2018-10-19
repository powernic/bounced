import {  calculateNextPosition, calculateRaysRoute, distance} from "../utils/formula";

const moveBalls = (state, action) => {
    if (!action.tapPosition) return state;
    let { route, passedRouteInd} = state;
    if(!((passedRouteInd+1)+'' in route)){
            const ball = state.playerPosition;
            return {
                ...state,
                ball,
                passedRouteInd:0,
                fire: false,
            };
    }
    let nextRoutePoint = route[passedRouteInd+1];
    let bounceOff = false;
    let ball;
    let angle;
    if(distance(action.ball,{x:nextRoutePoint.x,y:nextRoutePoint.y}) < 10){
        bounceOff = true;
        angle = nextRoutePoint.angle;
        ball = calculateNextPosition(nextRoutePoint.x, nextRoutePoint.y, angle, 10);
    }else {
        angle = route[passedRouteInd].angle;
        ball = calculateNextPosition(action.ball.x, action.ball.y, angle, 10);
    }
    if(bounceOff){
        return {
            ...state,
            ball,
            passedRouteInd:++passedRouteInd
        };
    }else{
        return {
            ...state,
            ball
        };
    }
};

export default moveBalls;


export const startFire = (state) => {
    const ball = state.playerPosition;
    return {
        ...state,
        ball,
        passedRouteInd:0,
        fire: true,
    };
};


export const setRoute = (state, action) => {
    if (!action.payload) return state;
    const {tapPosition, playground, boxes} = action.payload;
    const route = calculateRaysRoute(state.playerPosition, tapPosition, playground, boxes.positions);
    return {
        ...state,
        route
    };
};
