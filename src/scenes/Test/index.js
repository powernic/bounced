import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Animated,
    Easing
} from 'react-native'
import Play from "../Play";

const arr = []
for (var i = 0; i < 2000; i++) {
    arr.push(i)
}

class Test extends Component {

    constructor () {
        super()
        this.animatedValue = []
        arr.forEach((value) => {
            this.animatedValue[value] = new Animated.Value(0)
        })
    }

    componentDidMount () {
        this.animate()
    }

    animate () {
        const animations = arr.map((item,ind) => {
            return Animated.timing(
                this.animatedValue[item],
                {
                    toValue: 1,
                    easing: Easing.linear,
                    duration: 1000
                }
            ).start()
        })
        Animated.stagger(5,animations).start()
    }

    render () {
        const animations = arr.map((a, i) => {
            return <Animated.View key={i} style={{opacity: this.animatedValue[a], height: 10, width: 10, backgroundColor: 'red', marginLeft: 3, marginTop: 3}} />
        })
        return (
            <View style={styles.container}>
                {animations}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

export default Test;