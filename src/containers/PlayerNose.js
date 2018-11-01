import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import PlayerNose from "../components/Canvas/PlayerNose";

import PropTypes from 'prop-types';

class PlayerNoseContainer extends Component {

    render() {
        const {tapPosition, playerPosition} = this.props;
        return (
            <Fragment>
                <PlayerNose tapPosition={tapPosition} playerPosition={playerPosition}/>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        tapPosition: store.player.position,
        playerPosition: store.player.playerPosition
    }
};


PlayerNoseContainer.propTypes = {
    tapPosition: PropTypes.shape({x: PropTypes.number, y: PropTypes.number}),
    playerPosition: PropTypes.shape({x: PropTypes.number, y: PropTypes.number})
};

export default connect(
    mapStateToProps
)(PlayerNoseContainer);
