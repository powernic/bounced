import React from 'react';
import {Svg} from "expo";

const Rays = (props) => {
    const route = props.route;
    let raycastTemplate = [];
    for (let ind in route) {
        let nextInd = (parseInt(ind) + 1) + '';
        if (!(nextInd in route)) break;
        raycastTemplate.push(<Svg.Line key={ind}
                                       x1={route[ind].x}w
                                       y1={route[ind].y}
                                       x2={route[nextInd].x}
                                       y2={route[nextInd].y}
                                       stroke="#fff"
                                       strokeLinecap="round"/>);
    }
    return raycastTemplate;
};

export default Rays;