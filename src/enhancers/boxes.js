import {addBoxesRow, setRoute, touchBox} from "../actions/GameActions";
import {nextLevel, stopFire} from "../actions/PlayerActions";

export const moveBalls = ({getState, dispatch}) => next => action => {
    console.log(action);
    return next(action);
}