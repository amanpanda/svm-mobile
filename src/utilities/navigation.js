import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
  Assets as AssetsScreen,
  Dashboard as DashboardScreen, 
  Submit as SubmitScreen,
  LogIn,
  Loading,
  Subcategories,
  Survey,
} from 'screens';

import { store } from 'ducks/root';

const headerStyle = {
  backgroundColor: '#025697',
}
const headerTitleStyle = {
  color: 'white',
}

const Dashboard = createStackNavigator({
  Dashboard: {
    screen: DashboardScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Dashboard',
      headerStyle,
      headerTitleStyle,
      headerTintColor: 'white'
    }),
  },
  Survey: {
    screen: Survey,
    navigationOptions: ({ navigation }) => ({
      title: 'General Survey',
      headerStyle,
      headerTitleStyle,
      headerTintColor: 'white'
    }),
  },
});

const Assets = createStackNavigator({
  Assets: {
    screen: AssetsScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Assets',
      headerStyle,
      headerTitleStyle,
      headerTintColor: 'white',
    }),
  },
  Subcategories: {
    screen: Subcategories,
    navigationOptions: ({ navigation }) => ({
      title: 'Subcategories',
      headerStyle,
      headerTitleStyle,
      headerTintColor: 'white',
    }),
  },
  Survey: {
    screen: Survey,
    navigationOptions: ({ navigation }) => ({
      title: 'Asset Survey',
      headerStyle,
      headerTitleStyle,
      headerTintColor: 'white'
    }),
  },
});


const Submit = createStackNavigator({
  Submit: {
    screen: SubmitScreen,
    navigationOptions: ({ navigation }) => ({
      title: 'Submit',
      headerStyle,
      headerTitleStyle,
    }),
  },
});

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
      Loading,
      LogIn,
      Tabs,
    },
    {
      initialRouteName: 'Loading',
    },
  ),
);
