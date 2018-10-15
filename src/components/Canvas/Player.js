import React from 'react';
import {Svg} from "expo";

const PlayerPoint = () => {
    const position = {
        x: 200,
        y: 600
    };

    return (
        <Svg.Circle cx={position.x} cy={position.y} r="10" fill="#FFFFFF"/>
    );
};

export default PlayerPoint;