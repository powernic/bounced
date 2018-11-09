import React from 'react';
import {Svg} from "expo";
import {calcAngle} from "../../utils/formula";

const PlayerPoint = (props) => {

    const getPoints = ({x, y}) => {
        const points = [
            (x) + "," + (y - 60),
            (x - 10) + "," + (y),
            (x + 10) + "," + (y)
        ];
        return points.join(" ");
    };

    const getTransform = (pointFrom, pointTo) => {
        const angle = calcAngle(pointFrom, pointTo);
        return "rotate(" + (angle - 90) + "," + pointFrom.x + "," + pointFrom.y + ")";
    };

    const {tapPosition, playerPosition} = props;

    if(tapPosition.x === 0 && tapPosition.y ===0){
        return false;
    }

    return (
        <Svg.Polygon
            transform={getTransform(playerPosition, tapPosition)}
            points={getPoints(playerPosition)}
            fillOpacity="0.5"
            fill="#FFFFFF"/>
    );
};

export default PlayerPoint;