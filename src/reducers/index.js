import { combineReducers } from 'redux'
import { playerReducer } from './player'
import { playgroundReducer } from './playground'

export const rootReducer = combineReducers({
    player: playerReducer,
    playground: playgroundReducer,
});