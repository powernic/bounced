import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import Rays from "../components/Canvas/Rays";
import PropTypes from 'prop-types';
import {setRoute} from "../actions/GameActions";
import {moveBalls, nextLevel} from "../actions/PlayerActions";

class RaysContainer extends Component {

    shouldComponentUpdate(nextProps) {
        if (nextProps.routes.length === 0) return true;
        if (nextProps.boxes.boxesPositions !== this.props.boxes.boxesPositions && this.props.boxes.boxesPositions.length > 0) {
            let fromPoints = [];
            let toPoints = [];
            nextProps.routes.map((route, key) => {
                const ind = nextProps.toRoutesInd[key]-1;
                const currentPoint = route[ind];
                const nextPoint = route[ind + 1];
                fromPoints.push(currentPoint);
                toPoints.push(nextPoint);
            });

            this.props.setRoute(fromPoints,toPoints, nextProps.playground, nextProps.boxes);
            //this.props.moveBalls();
            return false;
        }
        if (nextProps.routes === this.props.routes) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <Fragment>
                <Rays routes={this.props.routes} fire={this.props.fire}/>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        routes: store.player.routes,
        fire: store.player.fire,
        toRoutesInd: store.player.toRoutesInd,
        playground: store.playground,
        boxes: store.boxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveBalls: () => dispatch(moveBalls()),
        setRoute: (fromPoints, toPoints, playground, boxes) => dispatch(setRoute(fromPoints, toPoints, playground, boxes)),
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
