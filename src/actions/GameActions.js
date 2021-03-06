export const SET_PLAYGROUND = 'SET_PLAYGROUND';
export const SET_BOXES = 'SET_BOXES';
export const SET_ROUTE = 'SET_ROUTE';
export const SET_START_ROUTE = 'SET_START_ROUTE';
export const TOUCH_BOX = 'TOUCH_BOX';
export const REMOVE_BOX = 'REMOVE_BOX';
export const ADD_BOXES_ROW = 'ADD_BOXES_ROW';
export const BOXES_INIT = 'BOXES_INIT';

export const setPlayground = area => ({
    type: SET_PLAYGROUND,
    payload: area,
});

export const setBoxes = playground => ({
    type: SET_BOXES,
    payload: playground,
});

export const addBoxesRow = level => ({
    type: ADD_BOXES_ROW,
    payload: level,
});

export const boxesInit = playground => ({
    type: BOXES_INIT,
    payload: playground,
});

export const removeBox = () => ({
    type: REMOVE_BOX,
    payload: true,
});
export const touchBox = ind => ({
    type: TOUCH_BOX,
    payload: ind,
});
export const setStartRoute = (fromPoint,toPoint,playground, boxes) => ({
    type: SET_START_ROUTE,
    payload: {fromPoint,toPoint,playground, boxes},
});
export const setRoute = (fromPoints,toPoints,playground, boxes) => ({
    type: SET_ROUTE,
    payload: {fromPoints,toPoints,playground, boxes},
});