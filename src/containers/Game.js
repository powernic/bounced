import {connect} from 'react-redux'
import Canvas from '../components/Canvas';
import {moveBalls, moveObjects, startFire} from "../actions/PlayerActions";
import {addBoxesRow, boxesInit, setBoxes, setPlayground, setRoute} from "../actions/GameActions";

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
        moveBalls: (ball) => dispatch(moveBalls( ball)),
        startFire: (tapPosition) => dispatch(startFire(tapPosition)),
        setRoute: (fromPoint,toPoint,playground, boxes) => dispatch(setRoute(fromPoint,toPoint,playground, boxes)),
        setPlayground: area => dispatch(setPlayground(area)),
        setBoxes: playground => dispatch(setBoxes(playground)),
        addBoxesRow: playground => dispatch(addBoxesRow(playground)),
        boxesInit:playground => dispatch(boxesInit(playground)),
    }
};

const Game = connect(
    mapStateToProps,
    mapDispatchToProps
)(Canvas);

export default Game;