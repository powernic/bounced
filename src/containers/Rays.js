import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import Rays from "../components/Canvas/Rays";

class RaysContainer extends Component {

    render() {
        return (
            <Fragment>
                <Rays route={this.props.route} />
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        route: store.player.route,
    }
};


export default connect(
    mapStateToProps
)(RaysContainer);
