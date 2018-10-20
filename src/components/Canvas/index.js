'use strict';
import React, {Component} from 'react';
import {Svg} from "expo";
import {View} from "react-native";
import Boxes from "./Boxes";
import PlayerPoint from "./Player";
import Player from "../../containers/Player";
import PlayerBall from "../../containers/PlayerBall";

class Canvas extends Component {

    render() {
        const playground = this.props.playground;
        const viewBox = [0, 0, playground.bottomRight.x, playground.bottomRight.y].join(" ");
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    backgroundColor: '#ff0000',
                    width: "100%",
                }}
                onLayout={e => {
                    const area = e.nativeEvent.layout;
                    const playground = {
                        topLeft: {x: 0, y: 0},
                        topRight: {x: area.width, y: 0},
                        bottomLeft: {x: 0, y: area.height},
                        bottomRight: {x: area.width, y: area.height}
                    };
                    this.props.setPlayground(playground);
                    this.props.setBoxes(playground);
                }}
                onStartShouldSetResponder={() => true}
                onResponderRelease={e => {
                    this.props.startFire({
                        x: e.nativeEvent.locationX,
                        y: e.nativeEvent.locationY
                    })
                }}
                onResponderMove={e => {
                    const tapPosition = {
                        x: e.nativeEvent.locationX,
                        y: e.nativeEvent.locationY
                    };
                    this.props.moveObjects(tapPosition);
                    this.props.setRoute(this.props.position,tapPosition, playground,this.props.boxes);
                }
                }
            >
                <Svg
                    height={playground.bottomRight.y}
                    width={playground.bottomRight.x}
                    viewBox={viewBox}>
                    <PlayerPoint position={this.props.position}/>
                    <Player/>
                    <PlayerBall moveBalls={this.props.moveBalls}/>
                    <Boxes playground={playground} positions={this.props.boxes.positions} info={this.props.boxes.info}/>
                </Svg>
            </View>
        );
    }
};

export default Canvas;