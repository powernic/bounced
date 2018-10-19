export const SET_PLAYGROUND = 'SET_PLAYGROUND';
export const SET_BOXES = 'SET_BOXES';
export const SET_ROUTE = 'SET_ROUTE';

export const setPlayground = area => ({
    type: SET_PLAYGROUND,
    payload: area,
});

export const setBoxes = playground => ({
    type: SET_BOXES,
    payload: playground,
});
export const setRoute = (tapPosition,playground, boxes) => ({
    type: SET_ROUTE,
    payload: {tapPosition,playground, boxes},
});