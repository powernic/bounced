import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {moveBalls, nextLevel, stopFire} from "../actions/PlayerActions";
import {Animated, Easing} from "react-native";
import {distance} from "../utils/formula";
import PropTypes from 'prop-types';
import {addBoxesRow, touchBox} from "../actions/GameActions";


class PlayerBallContainer extends Component {

    getDuration = (
        from = {x: 0, y: 0},
        to = {x: 0, y: 0}) => {
        const velocity = 2;
        const length = distance(from, to);
        return length * velocity;
    };

    moveBall = (ball, ballToPosition, moveBalls, touchBoxId = false, boxes) => {
        const duration = this.getDuration(
            {x: ball.x._value, y: ball.y._value},
            ballToPosition);
        Animated.timing(ball, {
            toValue: ballToPosition,
            easing: Easing.linear,
            duration: duration
        }).start(() => {
            if (touchBoxId !== false) {
                this.props.touchBox(touchBoxId);
                const {row, column} = boxes.boxesPositions[touchBoxId].board;
                if (boxes.board[row][column] > 0) {
                    moveBalls();
                }
            } else {
                moveBalls();
            }
        });
    };

    shouldComponentUpdate(nextProps, nextState) {
        const {fire, route, ball, ballToPosition, toRouteInd, playground, switchLevel, level,boxes} = nextProps;
        const {nextLevel, moveBalls, addBoxesRow} = this.props;
        if (ballToPosition === this.props.ballToPosition &&
            (switchLevel === this.props.switchLevel)) return false;
        if (fire) {
            if (!switchLevel) {
                const ind = toRouteInd - 1;
                const item = route[ind];
                let touchBoxId = false;
                if (item.type === 'box') {
                    touchBoxId = item.boxInd;
                }
                this.moveBall(ball, ballToPosition, moveBalls, touchBoxId, boxes);
            } else {
                nextLevel(ballToPosition);
                addBoxesRow(level);
                return false;
            }
        }
        return true;
    }

    render() {
        const {ball} = this.props;
        return (
            <Fragment>
                <Animated.View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    position: "absolute",
                    transform: [{translateX: ball.x}, {translateY: ball.y}],
                    backgroundColor: "#fff"
                }}/>
            </Fragment>
        )
    }
}

const
    mapStateToProps = store => {
        return {
            ball: store.player.ballAnimated,
            ballToPosition: store.player.ballToPosition,
            fire: store.player.fire,
            route: store.player.route,
            level: store.player.level,
            toRouteInd: store.player.toRouteInd,
            switchLevel: store.player.switchLevel,
            playground: store.playground,
            boxes: store.boxes
        }
    };

const
    mapDispatchToProps = dispatch => {
        return {
            moveBalls: () => dispatch(moveBalls()),
            nextLevel: (playerPosition) => dispatch(nextLevel(playerPosition)),
            touchBox: (boxId) => dispatch(touchBox(boxId)),
            addBoxesRow: (level) => dispatch(addBoxesRow(level)),

        }
    };


PlayerBallContainer
    .propTypes = {
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
)

(
    PlayerBallContainer
)
;
