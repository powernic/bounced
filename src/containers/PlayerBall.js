import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {addPoint, moveBalls, nextLevel} from "../actions/PlayerActions";
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

    moveBall = (key, ball, ballToPosition, moveBalls, item, boxes) => {
        const duration = this.getDuration(
            {x: ball.x._value, y: ball.y._value},
            ballToPosition);
     //   console.log(`${duration} (${ball.x._value},${ball.y._value}) => (${ballToPosition.x},${ballToPosition.y})`);
        Animated.timing(ball, {
            toValue: ballToPosition,
            easing: Easing.linear,
            duration: duration
        }).start(() => {
            switch (item.type) {
                case 'box':
                  //  this.props.touchBox(item.boxInd);
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

    startMove = (key,ball, ballToPosition, moveBalls, item, boxes) => {
        setTimeout((key,ball, ballToPosition, moveBalls, item, boxes) => {
            this.moveBall(key, ball, ballToPosition, moveBalls, item, boxes);
        }, 100*key,key,ball, ballToPosition, moveBalls, item, boxes);
    };

    shouldComponentUpdate(nextProps, nextState) {
        const { route, ballToPosition, toRouteInd, boxes,ballKey} = nextProps;
        const {moveBalls,ball} = this.props;
        if(nextProps.fire) {
            const ind = toRouteInd - 1;
            const item = route[ind];
            this.startMove(ballKey,ball, ballToPosition, moveBalls, item, boxes);
        }
        return false;
    }


    componentDidMount() {
        const { fire, route,ball, ballToPosition, toRouteInd, boxes,ballKey} = this.props;
        if(fire){
            const ind = toRouteInd - 1;
            const item = route[ind];
            this.startMove(ballKey,ball, ballToPosition, moveBalls, item, boxes);
        }
    }

    render() {
        const {ball,ballKey} = this.props;
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