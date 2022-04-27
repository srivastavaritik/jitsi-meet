import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import ConferenceTab from '../../../../../conference/components/native/ConferenceTab';
import CarmodeTab from '../../../../../conference/components/native/carmode/Conference';
import { screen } from '../../../routes';
import { navigationContainerTheme } from '../../../screenOptions';
import {
    conferenceNavigationRef
} from '../ConferenceNavigationContainerRef';

import NavigationThumb, { THUMBS } from './NavigationThumb';
import styles from './styles';

const ConferenceTabs = createMaterialTopTabNavigator();

const ConferenceNavigationContainer = () => {
    const [ selectedThumb, setSelectedThumb ] = useState(THUMBS.FIRST);

    /**
     * Lights up the correct bottom navigation circle
     * in regards with the focused screen.
     */
    const onFocused = useCallback(selected => {
        if (selected === screen.car) {
            setSelectedThumb(THUMBS.SECOND);
        } else {
            setSelectedThumb(THUMBS.FIRST);
        }
    });

    const Carmode = useCallback(() => (
        <CarmodeTab
            onFocused = { onFocused } />
    ));

    const Conference = useCallback(() => (
        <ConferenceTab
            onFocused = { onFocused } />
    ));

    return (
        <NavigationContainer
            independent = { true }
            ref = { conferenceNavigationRef }
            theme = { navigationContainerTheme }>
            <ConferenceTabs.Navigator
                backBehavior = 'none'
                screenOptions = { styles.tabBarOptions }>
                <ConferenceTabs.Screen
                    component = { Conference }
                    name = { screen.conference.container } />
                <ConferenceTabs.Screen
                    component = { Carmode }
                    headerShown = { false }
                    name = { screen.car } />
            </ConferenceTabs.Navigator>
            <NavigationThumb selectedThumb = { selectedThumb } />
        </NavigationContainer>
    );
};

export default ConferenceNavigationContainer;
