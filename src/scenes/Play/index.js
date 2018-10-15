import React, {Component} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import Game from '../../containers/Game';

class Play extends Component {

    state = {
        isOpen: false,
        isDisabled: false,
        swipeToClose: true,
        sliderValue: 0.3,
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.scoreTab}>
                    <TouchableOpacity onPress={() => this.setState({isOpen: true})}
                                      style={{marginLeft: 10, padding: 15}}>
                        <Image
                            source={require('../../img/pause-button.png')}
                        />
                    </TouchableOpacity>
                    <Text style={{color: "#fff", fontSize: 50, lineHeight: 60}}>8</Text>
                    <View style={{
                        alignItems: 'flex-end', flexDirection: "row"
                    }}>
                        <View style={{
                            alignItems: 'center', marginRight: 10
                        }}>
                            <Image source={require('../../img/star.png')}/>
                            <Text style={{color: "#ff7e22", fontSize: 20}}>BEST </Text>
                        </View>
                        <Text style={{color: "#fff", fontSize: 20}}>270</Text>
                        <Text style={{color: "#ff7e22", fontSize: 20}}>364</Text>
                    </View>
                </View>
                <Game/>
            </View>);
    }
}

const styles = StyleSheet.create({
    modalMenu: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 320,
        width: 300,
        backgroundColor: "rgba(0,0,0,0)"
    },
    text: {
        color: "#000"
    },
    scoreTab: {
        backgroundColor: "#282828",
        height: 75,
        width: "100%",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },
    stopButton: {},
    container: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 60,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
    },
    red: {
        backgroundColor: '#ff7907',
    },
    blue: {
        backgroundColor: '#006df0',
    },
    lightblue: {
        backgroundColor: '#00b9f0',
    },
    button: {
        color: '#fff',
        fontSize: 30,
    },
    orange: {
        backgroundColor: '#ffd025',
    },
    green: {
        backgroundColor: '#00b527',
    },
    iconBtn: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#05a5d1',
        padding: 5,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        width: 240
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default Play;