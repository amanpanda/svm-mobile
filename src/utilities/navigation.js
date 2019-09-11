import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  Assets,
  Dashboard,
  Submit,
  LogIn,
  Loading,
} from 'screens';

import { store } from 'ducks/root';

const Tabs = createBottomTabNavigator(
  {
    Dashboard,
    Assets,
    Submit,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'Dashboard') {
          iconName = `ios-home`;
        } else if (routeName === 'Assets') {
          iconName = `ios-apps`;
        } else {
          iconName = `ios-send`;
        }
        // You can return any component that you like here!
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FF4500',
      inactiveTintColor: 'gray',
    },
  },
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: Loading,
      LogIn: LogIn,
      Tabs,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
