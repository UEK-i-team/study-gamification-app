import * as React from 'react';
import {createStaticNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from './pages/Home';
import PomodoroScreen from './pages/Pomodoro';
import ProfileScreen from './pages/Profile';
import TargetsScreen from './pages/Targets';
import TestScreen from './pages/Test';

const RootStack = createNativeStackNavigator({
    screens: {
        Home: {
            screen: Home,
            options: {headerShown: false},
        },
        Pomodoro: {
            screen: PomodoroScreen,
            options: {headerShown: false},
        },
        Profile: {
            screen: ProfileScreen,
            options: {headerShown: false},
        },
        Targets: {
            screen: TargetsScreen,
            options: {headerShown: false},
        },
        Test: {
            screen: TestScreen,
            options: {headerShown: false},
        }
    },
});

const Navigation = createStaticNavigation(RootStack);

export default function App() {
    return <Navigation />;
}