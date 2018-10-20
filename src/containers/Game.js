import {connect} from 'react-redux'
import Canvas from '../components/Canvas';
import {moveBalls, moveObjects, startFire} from "../actions/PlayerActions";
import {setBoxes, setPlayground, setRoute} from "../actions/GameActions";

const mapStateToProps = store => {
    return {
        playground: store.playground,
        position:store.player.playerPosition,
        boxes: store.boxes
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveObjects: tapPosition => dispatch(moveObjects(tapPosition)),
        moveBalls: (tapPosition, ball) => dispatch(moveBalls(tapPosition, ball)),
        startFire: () => dispatch(startFire()),
        setRoute: (fromPoint,toPoint,playground, boxes) => dispatch(setRoute(fromPoint,toPoint,playground, boxes)),
        setPlayground: area => dispatch(setPlayground(area)),
        setBoxes: playground => dispatch(setBoxes(playground))
    }
};

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default Game;