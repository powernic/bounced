import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import PlayerNose from "../components/Canvas/PlayerNose";
import Rays from "../components/Canvas/Rays";
import React from "react";


class PlayerContainer extends Component {
    render() {
        const {player, playground, boxes} = this.props;
        return (
            <Fragment>
                <PlayerNose
                    player={player}
                    playground={playground}/>
                <Rays player={player}
                      boxes={boxes}
                      playground={playground}
                      count="40"/>
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        player: store.player,
        playground: store.playground,
        boxes: store.boxes
    }
};

const Player = connect(
    mapStateToProps
)(PlayerContainer);

export default Player;