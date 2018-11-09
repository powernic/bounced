export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const MOVE_BALLS = 'MOVE_BALLS';
export const START_FIRE = 'START_FIRE';
export const STOP_FIRE = 'STOP_FIRE';
export const NEXT_LEVEL = 'NEXT_LEVEL';

export const moveObjects = tapPosition => ({
    type: MOVE_OBJECTS,
    tapPosition,
});

export const moveBalls = () => ({
    type: MOVE_BALLS,
    payload: true
});


export const startFire = (tapPosition) =>  ({
    type: START_FIRE,
    payload: tapPosition
});
export const stopFire = () =>  ({
    type: STOP_FIRE
});
export const nextLevel = (playerPosition) =>  ({
    type: NEXT_LEVEL,
    payload: playerPosition
});
