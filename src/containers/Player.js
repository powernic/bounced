import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import PlayerNose from "../components/Canvas/PlayerNose";
import Rays from "../components/Canvas/Rays";
import React from "react";

class PlayerContainer extends Component {

    render() {
        const {position, route, playground} = this.props;
        return (
            <Fragment>
                <PlayerNose
                    position={position}
                    playground={playground}/>
                <Rays route={route} count="10"/>
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        position: store.player.position,
        route: store.player.route,
        playground: store.playground,
        boxes: store.boxes.positions
    }
};


const Player = connect(
    mapStateToProps
)(PlayerContainer);

export default Player;