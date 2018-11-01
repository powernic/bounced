function moveObjects(state, action) {
    if (!action.tapPosition) return state;
    const {x, y} = action.tapPosition;
    const position = {x, y};
    return {
        ...state,
        position,
    };
}

export default moveObjects;