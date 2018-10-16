export const SET_PLAYGROUND = 'SET_PLAYGROUND';
export const SET_BOXES = 'SET_BOXES';

export const setPlayground = area => ({
    type: SET_PLAYGROUND,
    payload:area,
});

export const setBoxes = boxes => ({
    type: SET_BOXES,
    payload:boxes,
});
