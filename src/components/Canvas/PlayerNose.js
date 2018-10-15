import React from 'react';
import {Svg} from "expo";
import {calcAngle} from "../../utils/formula";

const PlayerNose = (props) => {
    const position = {
        x: 200,
        y: 600
    };
    const tapPosition = props.player.position;
    let points = [
        position.x+","+(position.y-100),
        (position.x-10)+","+(position.y),
        (position.x+10)+","+(position.y)
    ];
    const angle = calcAngle(position, tapPosition);
    const transform = "rotate("+(angle-90)+","+position.x+","+position.y+")";
    points = points.join(" ");
    return (
        <Svg.Polygon transform={transform} points={points} fillOpacity="0.5" fill="#FFFFFF"/>
    );
};

export default PlayerNose;