'use strict';
import React, {Component} from 'react';
import {Svg} from "expo";
import {View} from "react-native";
import Boxes from "./Boxes";
import PlayerPoint from "./Player";
import PlayerNose from "./PlayerNose";
import Rays from "./Rays";

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
                }}
                onStartShouldSetResponder={() => true}
                onResponderMove={e => {
                    this.props.moveObjects({
                        x: e.nativeEvent.locationX,
                        y: e.nativeEvent.locationY
                    })
                }
                }
            >
                <Svg
                     height={playground.bottomRight.y}
                     width={playground.bottomRight.x}
                     viewBox={viewBox}>
                    <Boxes playground={playground}/>
                    <PlayerPoint/>
                    <PlayerNose
                        player={this.props.player}
                        playground={playground}/>
                    <Rays  player={this.props.player}
                           playground={playground}
                           count="3"/>
                </Svg>
            </View>
        );
    }
};

export default Canvas;