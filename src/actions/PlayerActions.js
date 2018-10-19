export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const MOVE_BALLS = 'MOVE_BALLS';
export const START_FIRE = 'START_FIRE';


export const moveObjects = tapPosition => ({
    type: MOVE_OBJECTS,
    tapPosition,
});

export const moveBalls = (tapPosition,ball) => ({
    type: MOVE_BALLS,
    tapPosition,
    ball
});


export const startFire = () =>  ({
    type: START_FIRE
});