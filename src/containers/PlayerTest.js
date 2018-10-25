import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {Svg} from "expo";
import {moveBalls, moveObjects} from "../actions/PlayerActions";
import {Animated} from "react-native";
const {Circle} = Svg;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

class PlayerBallViewContainer extends Component {

    /*
        slideRight = Animated.spring(
            this._slide, {
                toValue:{x:20,y:0}
            }
        );*/

    //Слижком ресурсоемкая функция
    componentDidMount() {
        /* this.ball.addListener( (progress) => {
             this._ball.setNativeProps({ cx: progress.x.toString(),
                 cy: progress.y.toString()});
         });*/
    }

    render() {
        const {fireTo,fire,ball,moveBalls} = this.props;

        if(fire) {
            Animated.timing(this.ball, {toValue: ball, duration: 1000}).start(() => moveBalls( ball));
        }

        return (
            <Fragment>
                <Animated.View style={{
                    width:20,height:20,
                    position:"absolute",
                    top:this.ball.y,left:this.ball.x,
                    backgroundColor:"#000"}}/>  </Fragment>
        )
    }
}

const mapStateToProps = store => {
    return {
        ball: store.player.ball,
        fire: store.player.fire
    }
};

const mapDispatchToProps = dispatch => {
    return {
        moveBalls: (tapPosition, ball) => dispatch(moveBalls(tapPosition, ball)),
    }
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerBallViewContainer);
