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


    findAngleKf = (point, angle) => {
        const k = Math.tan(angle * Math.PI / 180);
        return {
            k: k,
            b: -k * point.x + point.y
        };
    }

    findAngleKfPoint = (point1, point2) => {
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

    findPoint = (point, currentAngle) => {
        const rayKf = this.findAngleKf(point, currentAngle);
        const corners = this.props.playground.corners;

        let points = [];

        if (currentAngle <= 90 && currentAngle >= 0) {
            points = [
                {
                    x: -rayKf.b / rayKf.k,
                    y: 0
                },
                {
                    x: 0,
                    y: rayKf.b
                }
            ];
        } else if (currentAngle <= 0 && currentAngle >= -90) {
            points = [
                {
                    x: 0,
                    y: rayKf.b
                },
                {
                    x: (corners.bottomLeft.y - rayKf.b) / (rayKf.k),
                    y: corners.bottomLeft.y
                }
            ];
        } else if (currentAngle <= -90 && currentAngle >= -180) {
            points = [
                {
                    x: (corners.bottomLeft.y - rayKf.b) / (rayKf.k),
                    y: corners.bottomLeft.y
                },
                {
                    x: corners.topRight.x,
                    y: rayKf.k * corners.topRight.x + rayKf.b
                }

            ];
        } else {
            points = [
                {
                    x: -rayKf.b / rayKf.k,
                    y: 0
                },
                {
                    x: corners.topRight.x,
                    y: rayKf.k * corners.topRight.x + rayKf.b
                }
            ];
        }

        const dist1 = Math.sqrt(Math.pow(point.x - points[0].x, 2) + Math.pow(point.y - points[0].y, 2));
        const dist2 = Math.sqrt(Math.pow(point.x - points[1].x, 2) + Math.pow(point.y - points[1].y, 2));
        if (dist1 <= dist2) {
            return points[0];
        } else {
            return points[1];
        }
    }

    setPlayground = (area, point) => {
        const corners = {
            topLeft: {x: 0, y: 0},
            topRight: {x: area.width, y: 0},
            bottomLeft: {x: 0, y: area.height},
            bottomRight: {x: area.width, y: area.height}
        };
        const playground = {
            corners: corners,
            angles: {
                topLeft: this.calcAngle(point, corners.topLeft),
                topRight: this.calcAngle(point, corners.topRight),
                bottomLeft: this.calcAngle(point, corners.bottomLeft),
                bottomRight: this.calcAngle(point, corners.bottomRight)
            }
        };
        this.props.setPlayground(playground);
    }

    getMirrorAngle(point, angle) {

        const corners = this.props.playground.corners;
        if (point.y === corners.topLeft.y || point.y === corners.bottomLeft.y) {
            return -angle;
        } else if (point.x === corners.topLeft.x || point.x === corners.topRight.x) {
            if (angle < 0) {
                return -(180 + angle);
            } else {
                return 180 - angle;
            }
        }
    }

    renderRaycast = (point, angle, count) => {
        let raycastTemplate = [];
        let endPoint = point;
        let width = 0;

        for (let key = 0; key < count; key++) {
            angle = this.getMirrorAngle(point, angle);
            endPoint = this.findPoint(endPoint, angle);
            width = Math.sqrt(Math.pow(endPoint.x - point.x, 2) + Math.pow(endPoint.y - point.y, 2));
            raycastTemplate.push(<View key={key} style={{
                width: 10, height: 10,
                position: 'absolute',
                left: point.x - 5,
                top: point.y - 5,
                borderRadius: 10,
                backgroundColor: "#ddd"
            }}>
                <Ray raySize={10} rayWidth={width} angle={angle}/>
            </View>);

            point = endPoint;
        }
        return raycastTemplate;
    };

    render() {
        let {ballPosition, tapPosition} = this.state;
        const angle = this.calcAngle(ballPosition, tapPosition);
        const pointPos = this.findPoint(ballPosition, angle);
        const width = Math.sqrt(Math.pow(pointPos.x - ballPosition.x, 2) + Math.pow(pointPos.y - ballPosition.y, 2));
        return (
            <View onLayout={e =>
                this.setPlayground(e.nativeEvent.layout, ballPosition)
            }
                  style={styles.playContainer} onStartShouldSetResponder={() => true}
                  onResponderMove={e => this.setState({
                      tapPosition: {
                          x: e.nativeEvent.locationX,
                          y: e.nativeEvent.locationY
                      }
                  })}>
                <Text style={{color: "#fff"}}>Полина молодец</Text>
                {this.renderRaycast(pointPos,angle,20)}
                <View style={{
                    width: 20, height: 20,
                    position: 'absolute',
                    left: ballPosition.x - 10,
                    top: ballPosition.y - 10,
                    borderRadius: 10,
                    backgroundColor: "#ff0000"
                }}>
                    <Ray Positions={{ballPosition}} raySize={20} rayWidth={width} angle={angle}/>
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