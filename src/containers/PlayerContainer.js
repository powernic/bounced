import React, {Component} from 'react';
import {connect} from 'react-redux'
import {setPlaygroundCorners} from "../actions/PlayerActions";
import Player from "../components/Player";

class PlayerContainer extends Component {
    render() {
        const {setPlaygroundCorners,playground} = this.props;
        return (
            <Player setPlaygroundCorners={setPlaygroundCorners} playground={playground}/>
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