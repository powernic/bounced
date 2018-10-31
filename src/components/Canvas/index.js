'use strict';
import React, {Component} from 'react';
import {Svg} from "expo";
import {View} from "react-native";
import Boxes from "./Boxes";
import PlayerBallContainer from "../../containers/PlayerBall";
import PlayerBallViewContainer from "../../containers/PlayerTest";
import PlayerNoseContainer from "../../containers/PlayerNose";
import RaysContainer from "../../containers/Rays";

class Canvas extends Component {
    prevMousePosition = {
        locationX: 0,
        locationY: 0
    };
    currentMousePosition = {
        locationX: 0,
        locationY: 0
    };

    handleLayout = ({nativeEvent}) => {
        const {setPlayground, boxesInit} = this.props;
        const area = nativeEvent.layout;
        const playground = {
            topLeft: {x: 0, y: 0},
            topRight: {x: area.width, y: 0},
            bottomLeft: {x: 0, y: area.height},
            bottomRight: {x: area.width, y: area.height}
        };
        setPlayground(playground);
        boxesInit(playground);
    };

    handleTouchUp = ({nativeEvent}) => {
        this.props.startFire({
            x: nativeEvent.locationX,
            y: nativeEvent.locationY
        });
        this.currentMousePosition = {
            locationX: nativeEvent.locationX,
            locationY: nativeEvent.locationY
        };
    };

    componentDidMount() {
        setInterval(() => {
            if ((Math.abs(this.currentMousePosition.locationX - this.prevMousePosition.locationX) > 1
                || Math.abs(this.currentMousePosition.locationY - this.prevMousePosition.locationY) > 1)) {
                this.prevMousePosition = {...this.currentMousePosition};
                const {moveObjects, setRoute, playground, position, boxes} = this.props;
                let tapPosition = {
                    x: this.currentMousePosition.locationX,
                    y: this.currentMousePosition.locationY
                };
                moveObjects(tapPosition);
                setRoute(position, tapPosition, playground, boxes);
            }
        }, 15);
    }

    handleMoveFinger = ({nativeEvent}) => {
        this.currentMousePosition = {
            locationX: nativeEvent.locationX,
            locationY: nativeEvent.locationY
        };
    };

    render() {
        const {playground, boxes, position} = this.props;
        const viewBox = [0, 0, playground.bottomRight.x, playground.bottomRight.y].join(" ");
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#ff0000',
                    width: playground.bottomRight.x > 0 ? playground.bottomRight.x : "100%",
                    position: "relative"
                }}
                onLayout={this.handleLayout}
                onStartShouldSetResponder={() => true}
                onResponderRelease={this.handleTouchUp}
                onResponderMove={this.handleMoveFinger}
            >
                <Svg
                    height={playground.bottomRight.y}
                    width={playground.bottomRight.x}
                    viewBox={viewBox}>
                    <PlayerNoseContainer/>
                    <RaysContainer/>
                    <Boxes boxes={boxes}/>
                </Svg>
                <PlayerBallContainer/>
            </View>
        );
    }
};

export default Canvas;