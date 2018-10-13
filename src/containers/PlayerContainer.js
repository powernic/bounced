import React, {Component} from 'react';
import {connect} from 'react-redux'
import {setPlayground} from "../actions/PlayerActions";
import Player from "../components/Player";

class PlayerContainer extends Component {
    render() {
        const {setPlayground,playground} = this.props;
        return (
            <Player setPlayground={setPlayground} playground={playground}/>
        );
    }
}

const mapStateToProps = store => {
    return {
        playground: store.playground,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setPlayground: playground => dispatch(setPlayground(playground))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerContainer);