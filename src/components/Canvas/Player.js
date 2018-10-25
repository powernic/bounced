import React from 'react';
import {Svg} from "expo";

const PlayerPoint = (props) => {
    const {position} = props;


    return (
        <Svg.Circle cx={position.x} cy={position.y} r="10" fill="#FFFFFF"/>
    );
};

export default PlayerPoint;