import React, {Component} from 'react';
import {Platform, TouchableOpacity, Image, Alert, StyleSheet, Text, View, Animated, Easing} from 'react-native';
import {Actions} from "react-native-router-flux";

let SoundPlayer = require("react-native-audio-player-recorder-no-linking");
let song = null;
const arr = []
for (let i = 0; i < 7; i++) {
    arr.push(i)
}

class Home extends Component{
    constructor(props) {
        super(props);

        this.state = {
            pause: false
        }

        this.animatedValue = []
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0)
        })
        this.animatedValueTitle = new Animated.Value(-330);
    }

    UNSAFE_componentWillMount() {
        this.animate()
    }

    animate() {
        const animations = arr.map((item) => {
            return Animated.timing(
                this.animatedValue[item], {
                    toValue: 1,
                    easing: Easing.elastic(1.3),
                    duration: 250
                })
        })
        const animationTitle = Animated.timing(
            this.animatedValueTitle,
            {
                toValue: 0,
                easing: Easing.elastic(1.3),
                duration: 250
            });

        Animated.sequence([animationTitle,
            Animated.parallel([animations[0], animations[1], animations[2]]),
            animations[3], animations[4], animations[5], animations[6]]).start()
    }

    onPressButtonPlay() {
        song = new SoundPlayer('sound1.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                Alert.alert(
                    'Alert Title',
                    'My Alert Msg',
                    [
                        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    {cancelable: false}
                )
            } else {
                song.play((success) => {
                    if (!success) {
                        Alert.alert(
                            'Alert Title2',
                            'My Alert Msg',
                            [
                                {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                            ],
                            {cancelable: false}
                        )
                    }
                })
            }
        })
    }

    changeScene(sceneName){

        const animations = arr.map((item) => {
            return Animated.timing(
                this.animatedValue[item], {
                    toValue: 0,
                    easing: Easing.elastic(1.3),
                    duration: 250
                })
        })
        const animationTitle = Animated.timing(
            this.animatedValueTitle,
            {
                toValue: -330,
                easing: Easing.elastic(1.3),
                duration: 250
            });

        Animated.sequence([animations[6],animations[5],animations[4],
            animations[3],Animated.parallel([animations[0], animations[1], animations[2]]),
            animationTitle]).start(() => Actions[sceneName]({data: "Custom data2", title: "Custom title2"}))

    }

    render() {
        const animatedStyle = arr.map((a, i) => {
            return {
                opacity: this.animatedValue[a],
                transform: [{scale: this.animatedValue[a]}]
            }
        });
        const animatedTitle = {
            right: this.animatedValueTitle
        }
        return (
            <View style={styles.container}>
                <Animated.View style={animatedTitle}>
                    <Text style={styles.title}>BOUNCE!</Text>
                </Animated.View>
                <Animated.View style={[animatedStyle[0]]}>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => this.changeScene('Play')}
                    >
                        <Text style={styles.button}>PLAY</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[animatedStyle[1]]}>
                    <TouchableOpacity
                        style={[styles.buttonContainer, styles.orange]}>
                        <Text style={styles.button}
                        >ADVANCED</Text>
                    </TouchableOpacity>
                </Animated.View>
                <Animated.View style={[animatedStyle[2]]}>
                    <TouchableOpacity style={[styles.buttonContainer, styles.green]}>
                        <Text style={styles.button}
                        >CHALLENGE</Text>
                    </TouchableOpacity>
                </Animated.View>
                <View style={[styles.alternativeLayoutButtonContainer]}>
                    <Animated.View style={[animatedStyle[3]]}>
                        <TouchableOpacity style={[styles.iconBtn, styles.green]}>
                            <Image
                                source={require('../../img/volume.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={animatedStyle[4]}>
                        <TouchableOpacity
                            style={[styles.iconBtn, styles.red]}>
                            <Image
                                source={require('../../img/music.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={animatedStyle[5]}>
                        <TouchableOpacity
                            style={[styles.iconBtn, styles.blue]}>
                            <Image
                                source={require('../../img/vk.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={animatedStyle[6]}>
                        <TouchableOpacity
                            style={[styles.iconBtn, styles.lightblue]}>
                            <Image
                                source={require('../../img/buy.png')}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 5,
        backgroundColor: '#000',
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
        fontSize: 30
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
        width: 50,
        height: 50,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#05a5d1',
        padding: 5,
        marginTop: 15,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        width: 220
    },
    alternativeLayoutButtonContainer: {
        margin: 20,
        marginTop: 50,
        width: '80%',
        marginLeft: 'auto',
        marginRight: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});
module.exports = Home;