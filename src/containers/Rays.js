import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import Rays from "../components/Canvas/Rays";
import PropTypes from 'prop-types';
import {setRoute} from "../actions/GameActions";
import {moveBalls, nextLevel} from "../actions/PlayerActions";

class RaysContainer extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.route.length === 0) return true;
        if (nextProps.boxes.boxesPositions !== this.props.boxes.boxesPositions && this.props.boxes.boxesPositions.length > 0) {
            const ind = nextProps.toRouteInd;
            const currentPoint = nextProps.route[ind];
            const nextPoint = nextProps.route[ind + 1];
            this.props.setRoute(
                {
                    x: currentPoint.x,
                    y: currentPoint.y
                },
                {
                    x: nextPoint.x,
                    y: nextPoint.y
                }, nextProps.playground, nextProps.boxes);
            this.props.moveBalls();
            return false;
        }
        if (nextProps.route === this.props.route) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <Fragment>
                <Rays route={this.props.route} fire={this.props.fire}/>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        route: store.player.route,
        fire: store.player.fire,
        toRouteInd: store.player.toRouteInd,
        playground: store.playground,
        boxes: store.boxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveBalls: () => dispatch(moveBalls()),
        setRoute: (fromPoint, toPoint, playground, boxes) => dispatch(setRoute(fromPoint, toPoint, playground, boxes)),
    };
}

RaysContainer.propTypes = {
    route: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number, y: PropTypes.number,
        angle: PropTypes.number,
        type: PropTypes.oneOf(['box', 'playground']),
        boxInd: PropTypes.number
    })),
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RaysContainer);
