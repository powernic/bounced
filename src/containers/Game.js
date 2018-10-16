import {connect} from 'react-redux'
import Canvas from '../components/Canvas';
import {moveObjects} from "../actions/PlayerActions";
import {setBoxes, setPlayground} from "../actions/GameActions";

const mapStateToProps = store => {
    return {
        playground: store.playground,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        moveObjects: tapPosition => dispatch(moveObjects(tapPosition)),
        setPlayground: area => dispatch(setPlayground(area)),
        setBoxes: boxes => dispatch(setBoxes(boxes)),
    }
}

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default Game;