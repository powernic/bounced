import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {moveBalls} from "../actions/PlayerActions";
import {Animated, Easing} from "react-native";
import {distance} from "../utils/formula";
import PropTypes from 'prop-types';


class PlayerBallContainer extends Component {

    getDuration = (
        from = {x: 0, y: 0},
        to = {x: 0, y: 0}) => {
        const velocity = 2;
        const length = distance(from, to);
        return length * velocity;
    };

    render() {
        const {fire, ball, moveBalls} = this.props;
        if (fire) {
            Animated.timing(ball.from, {
                toValue:
                    {
                        x: ball.to.x._value,
                        y: ball.to.y._value
                    },
                easing: Easing.linear,
                duration: this.getDuration(
                    {x: ball.from.x._value, y: ball.from.y._value},
                    {x: ball.to.x._value, y: ball.to.y._value})
            }).start(() => {
                moveBalls(ball.to)
            });
        }
        return (
            <Fragment>
                <Animated.View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    position: "absolute",
                    transform: [{translateX: ball.from.x}, {translateY: ball.from.y}],
                    backgroundColor: "#fff"
                }}/>
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        ball: store.player.ballAnimated,
        fire: store.player.fire
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveBalls: (tapPosition, ball) => dispatch(moveBalls(tapPosition, ball)),
    }
};


PlayerBallContainer.propTypes = {
    ball: PropTypes.shape(
        {
            from: PropTypes.object,
            to: PropTypes.object
        }),
    fire: PropTypes.bool
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerBallContainer);
