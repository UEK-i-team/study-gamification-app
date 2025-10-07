import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './Home';
import PomodoroScreen from './Pomodoro';

const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {headerShown: false},
        },
        Pomodoro: {
            screen: PomodoroScreen,
            options: {headerShown: false},
        }
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />;
}