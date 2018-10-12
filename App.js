import React, {Component} from 'react';
import {Platform, TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {
    Scene,
    Router,
    Actions,
    Reducer,
    ActionConst,
    Overlay,
    Tabs,
    Modal,
    Drawer,
    Stack,
    Lightbox,
} from 'react-native-router-flux';
import { store } from './src/store/configureStore' // исправлено
import {Provider} from 'react-redux';
import Home from './src/scenes/Home';
import Play from './src/scenes/Play';

const App = () => (
    <Provider store={store}>
        <Router>
            <Overlay>
                <Stack key="root">
                    <Scene key="Play" hideNavBar component={Play}/>
                    <Scene key="Home" hideNavBar component={Home}/>
                </Stack>
            </Overlay>
        </Router>
    </Provider>
);
export default App;