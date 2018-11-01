import {combineReducers} from 'redux'
import {playerReducer} from './player'
import {playgroundReducer} from './playground'
import {boxesReducer} from "./boxes";

export const rootReducer = combineReducers({
    player: playerReducer,
    playground: playgroundReducer,
    boxes: boxesReducer,
});