import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import Pomodoro from './Pomodoro';

const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {title: "Welcome"},
        },
        Pomodoro: {
            screen: Pomodoro,
        }
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />;
}