import React from 'react';
import {Svg} from "expo";

const Rays = (props) => {
    const {route, fire} = props;
    const maxRays = 2;
    if (route.length === 0 || fire) return false;
    let raycastTemplate = [];
    for (let ind in route) {
        const currentInd = parseInt(ind);
        let nextInd = (currentInd + 1) + '';
        if (!(nextInd in route) || currentInd >= maxRays) break;
        raycastTemplate.push(<Svg.Line key={ind}
                                       x1={route[ind].x} w
                                       y1={route[ind].y}
                                       x2={route[nextInd].x}
                                       y2={route[nextInd].y}
                                       stroke="#fff"
                                       strokeLinecap="round"/>);
    }
    return raycastTemplate;
};

export default Rays;