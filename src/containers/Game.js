import {connect} from 'react-redux'
import Canvas from '../components/Canvas';
import {moveObjects} from "../actions/PlayerActions";
import {setPlayground} from "../actions/GameActions";

const mapStateToProps = store => {
    return {
        player: store.player,
        playground: store.playground,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moveObjects: tapPosition => dispatch(moveObjects(tapPosition)),
        setPlayground: area => dispatch(setPlayground(area))
    }
}

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default Game;