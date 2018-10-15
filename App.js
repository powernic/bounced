import React from 'react';
import {
    Scene,
    Router,
    Overlay,
    Stack,
} from 'react-native-router-flux';
import Home from './src/scenes/Home';
import Play from './src/scenes/Play';
import {store} from "./src/store/configureStore";
import {Provider} from 'react-redux';

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