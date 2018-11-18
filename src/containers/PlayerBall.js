import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {addPoint, nextLevel} from "../actions/PlayerActions";
import {Animated, Easing, Text} from "react-native";
import {distance} from "../utils/formula";
import PropTypes from 'prop-types';
import {addBoxesRow, touchBox} from "../actions/GameActions";
import {BOARD_EMPTY} from "../utils/constants";


class PlayerBallContainer extends Component {

    getDuration = (
        from = {x: 0, y: 0},
        to = {x: 0, y: 0}) => {
        const velocity = 2;
        const length = distance(from, to);
        return length * velocity;
    };

    moveBall = (key, ball, ballToPosition, moveBalls, item, boxes, duration) => {
        //console.log(`${duration} (${ball.x._value},${ball.y._value}) => (${ballToPosition.x},${ballToPosition.y})`);
        // console.log(ball);
        Animated.timing(ball, {
            toValue: ballToPosition,
            easing: Easing.linear,
            useNativeDriver: true,
            duration: duration
        }).start(() => {
            switch (item.type) {
                case 'box':
                    this.props.touchBox(item.boxInd);
                    console.log(boxes   );
                    const {row, column} = boxes.boxesPositions[item.boxInd].board;
                    if (boxes.board[row][column] !== BOARD_EMPTY) {
                        moveBalls(key);
                    }
                    break;
                case 'point':
                    this.props.touchBox(item.boxInd);
                    this.props.addPoint();
                    break;
                default:
                    moveBalls(key);
                    break;
            }
        });
    };

    startMove = (timeout = 0, key, ball, ballToPosition, moveBalls, item, boxes, duration) => {
        setTimeout((key, ball, ballToPosition, moveBalls, item, boxes, duration) => {
            this.moveBall(key, ball, ballToPosition, moveBalls, item, boxes, duration);
        }, timeout, key, ball, ballToPosition, moveBalls, item, boxes, duration);
    };

    shouldComponentUpdate(nextProps, nextState) {
        const {route, ballToPosition, toRouteInd, ballKey} = nextProps;
        const {moveBalls, ball,boxes} = this.props;
        if (nextProps.fire && ballToPosition !== this.props.ballToPosition) {
            const ind = toRouteInd - 1;
            const item = route[ind];
            let duration;
            if (ballKey === 0 && ind === 0 &&
                this.props.ballToPosition.x === 0 && this.props.ballToPosition.y === 0) {
                duration = this.getDuration(
                    {x: ball.x._value, y: ball.y._value},
                    ballToPosition);
            } else {
                duration = this.getDuration(
                    this.props.ballToPosition,
                    ballToPosition);
            }
            this.startMove(0, ballKey, ball, ballToPosition, moveBalls, item, boxes, duration);
        }
        return false;
    }


    componentDidMount() {
        const {fire, route, ball, ballToPosition, moveBalls, toRouteInd, boxes, ballKey} = this.props;
        console.log(boxes);
        const duration = this.getDuration(
            {x: ball.x._value, y: ball.y._value},
            ballToPosition);
        if (fire) {
            const ind = toRouteInd - 1;
            const item = route[ind];
            this.startMove(4000 * ballKey, ballKey, ball, ballToPosition, moveBalls, item, boxes, duration);
        }
    }

    render() {
        const {ball, ballKey} = this.props;
        return (
            <Fragment>
                <Animated.View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    position: "absolute",
                    transform: [{translateX: ball.x}, {translateY: ball.y}],
                    backgroundColor: "#fff"
                }}><Text>{ballKey}</Text></Animated.View>
            </Fragment>
        )
    }
}

export default PlayerBallContainer;