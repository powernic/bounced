import React from 'react';
import {Svg} from "expo";
import {borderCollision, calcAngle, mirrorAngle} from "../../utils/formula"

const Rays = (props) => {
    const position = {
        x: 200,
        y: 600
    };

    let angle = 0;
    let width = 0;
    let raycastTemplate = [];
    let point = position;
    let endPoint = point;

    for (let key = 0; key < props.count; key++) {
        if(key === 0){
            angle = calcAngle(position, props.player.position);
        }else {
            angle = mirrorAngle(props.playground, point, angle);
        }
        endPoint = borderCollision(props.playground, endPoint, angle);
        width = Math.sqrt(Math.pow(endPoint.x - point.x, 2) + Math.pow(endPoint.y - point.y, 2));
        raycastTemplate.push(<Svg.Line key={key}
            x1={point.x}
            y1={point.y}
            x2={endPoint.x}
            y2={endPoint.y}
            stroke="#fff"
            strokeWidth="5"
            strokeDasharray="0 10"
            strokeOpacity="0.6"
            strokeLinecap="round"/>);
        point = endPoint;
    }

    return raycastTemplate;
};

export default Rays;