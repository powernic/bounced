import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {Svg} from "expo";
class PlayerBallContainer extends Component {

    componentDidMount(){
        setInterval(() => {
            if(this.props.player.fire){
                this.props.moveBalls(this.props.player.position,
                    this.props.player.ball);
            }
        },10)
    }

    render() {
        const {player} = this.props;
        return (
            <Fragment>
                <Svg.Circle cx={player.ball.x} cy={player.ball.y} r="10" fill="#FFFFFF"/>
            </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        player: store.player,
    }
};

const PlayerBall = connect(
    mapStateToProps
)(PlayerBallContainer);

export default PlayerBall;