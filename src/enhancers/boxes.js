import {addBoxesRow, setRoute, touchBox} from "../actions/GameActions";
import {nextLevel, stopFire} from "../actions/PlayerActions";

export const moveBalls = ({getState, dispatch}) => next => action => {
    let prevState;
    let result;
    let nextState;
    switch (action.type) {
        case 'MOVE_BALLS':
            prevState = getState();
            result = next(action);
            nextState = getState();
            if (prevState.player.passedRouteInd !== nextState.player.passedRouteInd) {
                const ind = prevState.player.passedRouteInd;
                const item = nextState.player.route[ind];
                if (item.type === 'box') {
                    dispatch(touchBox(item.boxInd));
                }
            }

            if(nextState.player.ballAnimated.from.y > 600){
                //Добавить 1 очко
                //Добавить боксов

                dispatch(stopFire());
                dispatch(nextLevel());
                dispatch(addBoxesRow(nextState.playground));
            }

            return result;

        case 'TOUCH_BOX':
            prevState = getState();
            result = next(action);
            nextState = getState();
            if(nextState.boxes.boxesPositions !== prevState.boxes.boxesPositions){
                const ind = nextState.player.passedRouteInd;
                const currentPoint = nextState.player.route[ind];
                const nextPoint = nextState.player.route[ind+1];
                dispatch(setRoute(
                    {x:currentPoint.x,
                    y:currentPoint.y},
                    {x:nextPoint.x,
                        y:nextPoint.y},nextState.playground,nextState.boxes));
            }
            return result;
        default:
            return next(action);
    }
}