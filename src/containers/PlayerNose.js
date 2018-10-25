import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import PlayerNose from "../components/Canvas/PlayerNose";

class PlayerNoseContainer extends Component {

    render() {
        const {tapPosition,playerPosition} = this.props;
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


export default connect(
    mapStateToProps
)(PlayerNoseContainer);
