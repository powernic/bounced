'use strict';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ray from "./Ray";

class Player extends Component {

    state = {
        ballPosition: {
            x: 200,
            y: 400
        },
        tapPosition: {
            x: 0,
            y: 0
        },
    }


    findAngleKf = (point1, point2) => {
        const diffY = (point2.y - point1.y);
        const diffX = (point2.x - point1.x);
        if (diffX === 0) {
            return false;
        }
        const div = diffY / diffX;
        const k = div;
        const b = -div * point1.x + point1.y;
        return {k: k, b: b};
    };

    calcAngle = (point1, point2) => {
        return (Math.atan2(point1.y - point2.y, point1.x - point2.x) * 180) / Math.PI;
    }

    findPoint = (point1, point2, area, currentAngle) => {
        const rayKf = this.findAngleKf(point1, point2);
        const corners = this.props.playground.corners;

        const angleToTopRight = this.calcAngle(point1, corners.topRight);
        const angleToTopLeft = this.calcAngle(point1, corners.topLeft);
        const angleToBottomRight = this.calcAngle(point1, corners.bottomRight);
        const angleToBottomLeft = this.calcAngle(point1, corners.bottomLeft);

        if (currentAngle <= angleToTopRight && currentAngle >= angleToTopLeft) {
            const sideKf = this.findAngleKf(corners.topLeft, corners.topRight);
            return {
                x: (sideKf.b - rayKf.b) / (rayKf.k - sideKf.k),
                y: 0
            }
        } else if (currentAngle <= angleToTopLeft && currentAngle > angleToBottomLeft) {
            return {x: 0, y: rayKf.b}
        } else if (currentAngle <= angleToBottomLeft && currentAngle >= angleToBottomRight) {
            const sideKf = this.findAngleKf(corners.bottomLeft, corners.bottomRight);
            return {
                x: (sideKf.b - rayKf.b) / (rayKf.k - sideKf.k),
                y: area.height}
        } else {
            const y = rayKf.k * area.width + rayKf.b;
            return {x: area.width, y: y}
        }
    }

    setPlaygroundCorners = e => {
        const area = e.nativeEvent.layout;
        this.props.setPlaygroundCorners({
            topLeft:{x: 0, y: 0},
            topRight:{x: area.width, y: 0},
            bottomLeft:{x: 0, y:  area.height},
            bottomRight:{x: area.width, y: area.height}
        });
    }

    render() {
        let {ballPosition, tapPosition} = this.state;
        const angle = this.calcAngle(ballPosition, tapPosition);
        const pointPos = this.findPoint(ballPosition, tapPosition, angle);
        const angle2 = -angle;
        const mirrorPosition = pointPos;
        const width = Math.sqrt(Math.pow(pointPos.x - ballPosition.x, 2) + Math.pow(pointPos.y - ballPosition.y, 2));
        return (
            <View onLayout={this.setPlaygroundCorners}
                  style={styles.playContainer} onStartShouldSetResponder={() => true}
                  onResponderMove={(e) => {
                      this.setState({
                          tapPosition: {
                              x: e.nativeEvent.locationX,
                              y: e.nativeEvent.locationY
                          }
                      })
                  }
                  }>
                <Text style={{color: "#fff"}}>Полина молодец</Text>
                <View style={{
                    width: 10, height: 10,
                    position: 'absolute',
                    left: mirrorPosition.x - 5,
                    top: mirrorPosition.y - 5,
                    borderRadius: 10,
                    backgroundColor: "#ff0000"
                }}>
                    <Ray Positions={{mirrorPosition}} rayWidth={width} angle={angle2}/>
                </View>
                <View style={{
                    width: 20, height: 20,
                    position: 'absolute',
                    left: ballPosition.x - 10,
                    top: ballPosition.y - 10,
                    borderRadius: 10,
                    backgroundColor: "#ff0000"
                }}>
                    <Ray Positions={{ballPosition}} rayWidth={width} angle={angle}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    playContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#000',
        width: "100%",
    },
});

// в наш компонент App, с помощью connect(mapStateToProps)
export default Player;