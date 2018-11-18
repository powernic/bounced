import {applyMiddleware, createStore} from 'redux'
import {rootReducer} from '../reducers'
import logger from 'redux-logger'
import {moveBalls} from "../enhancers/boxes";

export const store = createStore(rootReducer,
   // applyMiddleware(moveBalls)
);