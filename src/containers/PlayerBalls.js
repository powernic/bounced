import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {addPoint, moveBalls, nextLevel} from "../actions/PlayerActions";
import {Animated, Easing, Text} from "react-native";
import {distance} from "../utils/formula";
import PropTypes from 'prop-types';
import {addBoxesRow, touchBox} from "../actions/GameActions";
import {BOARD_EMPTY} from "../utils/constants";
import PlayerBallContainer from "./PlayerBall";

const {memo} = React;


class PlayerBallsContainer extends Component {

    getDuration = (
        from = {x: 0, y: 0},
        to = {x: 0, y: 0}) => {
        const velocity = 2;
        const length = distance(from, to);
        return length * velocity;
    };

    moveBall = (ball, ballToPosition, moveBalls, item, boxes) => {
        const duration = this.getDuration(
            {x: ball.x._value, y: ball.y._value},
            ballToPosition);
        Animated.timing(ball, {
            toValue: ballToPosition,
            easing: Easing.linear,
            duration: duration
        }).start(() => {
            /* switch (item.type) {
                 case 'box':
                     this.props.touchBox(item.boxInd);
                     const {row, column} = boxes.boxesPositions[item.boxInd].board;
                     if (boxes.board[row][column] !== BOARD_EMPTY) {
                         moveBalls();
                     }
                     break;
                 case 'point':
                     this.props.touchBox(item.boxInd);
                     this.props.addPoint();
                     break;
                 default:
                     moveBalls();
                     break;
             }*/
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        const {fire, route, routes, balls,boxInit, ballsToPosition, toRouteInd, playground, switchLevel, level, boxes} = nextProps;
        const {nextLevel, moveBalls, addBoxesRow} = this.props;

        if (ballsToPosition === this.props.ballsToPosition &&
            (switchLevel === this.props.switchLevel) && this.props.boxInit) return false;

        if(fire || boxInit !== this.props.boxInit){
            return true
        }else{
            return false;
        }
        /*
        if (ballsToPosition === this.props.ballsToPosition &&
            (switchLevel === this.props.switchLevel)) return false;
*//*
        if (fire) {

            const arrayOfABallsnimated = balls.map((ball, key) => {
                const arrayOfBallAnimated = routes[key].map((route, ind, items) => {
                        if (items.length === ind + 1) {
                            return false;
                        }
                        const duration = this.getDuration(
                            {x: route.x, y: route.y},
                            {x: items[ind + 1].x, y: items[ind + 1].y});
                        return Animated.timing(ball, {
                            toValue: {x: items[ind + 1].x - 10, y: items[ind + 1].y - 10},
                            duration: duration,
                            easing: Easing.linear,
                            useNativeDriver: true,
                        });
                    }
                );
                delete arrayOfBallAnimated.splice(arrayOfBallAnimated.length - 1, 1);
                return Animated.sequence(arrayOfBallAnimated);
            });
            let routesInd = {};
            Animated.stagger(5000, arrayOfABallsnimated).start(null, (t, cur) => {
                console.log(cur);
               // console.log(ind);
                 /*   if (ind in routesInd) {
                        routesInd[ind]++;
                    } else {
                        routesInd[ind] = 0;
                    }
                    const item = routes[routesInd[ind]][ind];
                    switch (item.type) {
                        case 'box':
                         //   this.props.touchBox(item.boxInd);
                            break;
                        case 'point':
                        //    this.props.touchBox(item.boxInd);
                        //    this.props.addPoint();
                            break;
                        default:
                      //      moveBalls(key);
                            break;
                    }
                }
            );
            return true
        } else {
            return false;
        }*/
        if (fire) {
            if (!switchLevel) {
                const ind = toRouteInd - 1;
                const item = route[ind];
                this.moveBall(ball, ballsToPosition, moveBalls, item, boxes);
            } else {
                nextLevel(ballsToPosition);
                addBoxesRow(level);
                return false;
            }
        }
        return true;
    }

    render() {
        console.log("render");
        const {balls, points, routes, ballsToPosition, toRoutesInd, boxes, moveBalls, touchBox, addPoint, fire} = this.props;

        return (
            <Fragment>
                {balls.map((ball, key) => {
                        return <PlayerBallContainer
                            ballToPosition={ballsToPosition[key]}
                            toRouteInd={toRoutesInd[key]}
                            moveBalls={moveBalls}
                            touchBox={touchBox}
                            fire={fire}
                            addPoint={addPoint}
                            route={routes[key]}
                            boxes={boxes}
                            ball={ball} key={key} ballKey={key}/>
                 /*   return <Animated.View key={key} style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        position: "absolute",
                        transform: [{translateX: ball.x}, {translateY: ball.y}],
                        backgroundColor: "#fff"
                    }}><Text>{key}</Text></Animated.View>*/
                })}
                {/*<Text style={{
                    position: "absolute",
                    color: "#fff",
                    transform: [{translateX: 210}, {translateY: 595}],
                }}>X{points}</Text>*/}
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        balls: store.player.ballsAnimated,
        points: store.player.points,
        boxInit: store.boxes.init,
        ballsToPosition: store.player.ballsToPosition,
        fire: store.player.fire,
        routes: store.player.routes,
        level: store.player.level,
        toRoutesInd: store.player.toRoutesInd,
        switchLevel: store.player.switchLevel,
        playground: store.playground,
        boxes: store.boxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveBalls: (key) => dispatch(moveBalls(key)),
        nextLevel: (playerPosition) => dispatch(nextLevel(playerPosition)),
        touchBox: (boxId) => dispatch(touchBox(boxId)),
        addBoxesRow: (level) => dispatch(addBoxesRow(level)),
        addPoint: () => dispatch(addPoint()),

    }
};


PlayerBallsContainer.propTypes = {
    ball: PropTypes.shape(
        {
            from: PropTypes.object,
            to: PropTypes.object
        }),
    switchLevel: PropTypes.bool,
    fire: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerBallsContainer);
