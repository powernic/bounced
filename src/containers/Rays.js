import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import Rays from "../components/Canvas/Rays";

import PropTypes from 'prop-types';

class RaysContainer extends Component {

    render() {
        return (
            <Fragment>
                <Rays route={this.props.route}/>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        route: store.player.route,
    }
};


RaysContainer.propTypes = {
    route: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number, y: PropTypes.number,
        angle: PropTypes.number,
        type: PropTypes.oneOf(['box', 'playground']),
        boxInd: PropTypes.number
    })),
};


export default connect(
    mapStateToProps
)(RaysContainer);
