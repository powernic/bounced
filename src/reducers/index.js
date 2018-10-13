import { combineReducers } from 'redux'
import { playerReducer } from './player'

export const rootReducer = combineReducers({
    playground: playerReducer,
});