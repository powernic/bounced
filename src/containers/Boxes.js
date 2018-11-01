import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import PropTypes from 'prop-types';

class BoxesContainer extends Component {

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

BoxesContainer.propTypes = {
    route: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number, y: PropTypes.number,
        angle: PropTypes.number,
        type: PropTypes.oneOf(['box', 'playground']),
        boxInd: PropTypes.number
    })),
};

export default connect(
    mapStateToProps
)(BoxesContainer);
