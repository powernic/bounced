import React from 'react';
import {Svg} from "expo";

const Rays = (props) => {
    const route = props.route;
    let raycastTemplate = [];
    for (let ind in route) {
        let nextInd = (parseInt(ind) + 1) + '';
        if (!(nextInd in route)) break;
        raycastTemplate.push(<Svg.Line key={ind}
                                       x1={route[ind].x}
                                       y1={route[ind].y}
                                       x2={route[nextInd].x}
                                       y2={route[nextInd].y}
                                       stroke="#fff"
                                       strokeWidth="5"
                                       strokeDasharray="0 10"
                                       strokeOpacity="0.6"
                                       strokeLinecap="round"/>);
    }
    return raycastTemplate;
};

export default Rays;