'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';


class Ray extends Component {

    state = {
        width: 100,
        left: 0,
        height: 0,
        translateX: 0,
        angle: 0
    }

    render() {
        let {ballPosition} = this.props.Positions;
        const width = this.props.rayWidth^0;
        const angle = this.props.angle;
        const translateX = -(width / 2)^0;  // отбрасываем дробную часть, т.к. начинатет глючить left
        const left = translateX^0;
        return (
            <View>
            <View style={{
                width: width,
                left: left + 10,
                top: 10,
                borderWidth: 1,
                transform: [{rotateZ: angle + 'deg'}, {translateX: translateX}],
                borderColor: "#fff",
                borderStyle: "dotted"
            }}/>
            </View>
        );
    }
}

module.exports = Ray;