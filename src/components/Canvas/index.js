'use strict';
import React, {Component} from 'react';
import {Svg} from "expo";
import {View} from "react-native";
import BoxesContainer from "../../containers/Boxes";
import PlayerBallsContainer from "../../containers/PlayerBalls";
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
            bottomLeft: {x: 0, y: 610},
            bottomRight: {x: area.width, y: 610}
        };
        setPlayground(playground);
        boxesInit(playground);
    };

    moveFinger = (fingerPosition) => {
        const {moveObjects, setRoute, playground, position, boxes} = this.props;
        let tapPosition = {
            x: fingerPosition.locationX,
            y: fingerPosition.locationY
        };
        setRoute(position, tapPosition, playground, boxes);
        moveObjects(tapPosition);
    }

    handleTouchUp = () => {
        if(!this.props.fire) {
            this.moveFinger(this.currentMousePosition);
            this.props.startFire({
                x: this.currentMousePosition.locationX,
                y: this.currentMousePosition.locationY
            });
        }
    };

    componentDidMount() {
        this.intervalId = setInterval(() => {
            if (!this.props.fire && (Math.abs(this.currentMousePosition.locationX - this.prevMousePosition.locationX) > 1
                || Math.abs(this.currentMousePosition.locationY - this.prevMousePosition.locationY) > 1)) {
                this.prevMousePosition = {...this.currentMousePosition};
                this.moveFinger(this.prevMousePosition);
            }
        }, 15);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }

    shouldComponentUpdate(nextProps){
        if(nextProps.fire){
            return false;
        }
        return true;
    }

    handleMoveFinger = ({nativeEvent}) => {
        this.currentMousePosition = {
            locationX: nativeEvent.locationX,
            locationY: nativeEvent.locationY
        };
    };

    render() {
        const {playground} = this.props;
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
                    <BoxesContainer/>
                </Svg>
                <PlayerBallsContainer/>
            </View>
        );
    }
};

export default Canvas;