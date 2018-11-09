import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import PropTypes from 'prop-types';
import Boxes from "../components/Canvas/Boxes";

class BoxesContainer extends Component {

    render() {
        return (
            <Fragment>
                <Boxes boxes={this.props.boxes}/>
            </Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        boxes: store.boxes,
    }
};

export default connect(
    mapStateToProps
)(BoxesContainer);
