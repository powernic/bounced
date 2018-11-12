import {connect} from 'react-redux'
import {Component, Fragment} from "react";
import React from "react";
import {Image, Text, View} from "react-native";

class GameStatus extends Component {

    render() {
        return (<Fragment>
            <Text style={{color: "#fff", fontSize: 50, lineHeight: 60}}>{this.props.level}</Text>
            <View style={{
                alignItems: 'flex-end', flexDirection: "row"
            }}>
                <View style={{
                    alignItems: 'center', marginRight: 10
                }}>
                    <Image source={require('../img/star.png')}/>
                    <Text style={{color: "#ff7e22", fontSize: 20}}>BEST </Text>
                </View>
                <Text style={{color: "#fff", fontSize: 20}}>270</Text>
                <Text style={{color: "#ff7e22", fontSize: 20}}>364</Text>
            </View>
        </Fragment>);
    }
};
const mapStateToProps = store => {
    return {
        level: store.player.level,
    }
};

export default connect(
    mapStateToProps,
)(GameStatus);
