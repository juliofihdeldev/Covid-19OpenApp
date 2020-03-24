import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from 'react-navigation-stack';
// Import navigation stack
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import InitialPage from './utils/InitialPage';
import QA from './component/QA';
import Information from './component/Information';
import Map from './component/Map';
import { color } from './utils/GlobalColor';

// tabs
const Tabs = createBottomTabNavigator(
	{
		Informations: { screen: Information },
		Diagnostic  : { screen: QA },
		Map         : { screen: Map },
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ focused, horizontal, tintColor }) => {
				const { routeName } = navigation.state;
				let IconComponent = Ionicons;
				let iconName;

				if (routeName === 'Informations') {
					iconName = `ios-paper${
						focused ? '' :
					''}`;
				}

				if (routeName === 'Diagnostic') {
					iconName = `ios-heart${
						focused ? '' :
					''}`;
				}
			
				else if (routeName === 'Map') {
					iconName = `ios-map${
						focused ? '' :
					''}`;
				}
		
				// You can return any component that you like here!
				return <IconComponent name={iconName} size={25} color={tintColor} />;
			},
		}),
		tabBarOptions: {
			labelStyle:
			{
				// display : 'none',
			},
			style: {
				backgroundColor: color.appDarkBlue,
			},
			activeTintColor: 'white',
			inactiveTintColor: '#9EEFF4',
			inactiveBackgroundColor: '#D31027',
			activeBackgroundColor: '#e52d27',
		},
	},
);


const NavigationRoute = createSwitchNavigator({
		// Auth: AuthRouetView,
		// Init: InitialPage,
		Tabs: Tabs,
	},
	{
		initialRouteName: 'Tabs',
	},
);

const RootStack = createSwitchNavigator({
		NavigationRoute: NavigationRoute,
	},
	{
		initialRouteName: 'NavigationRoute',
	},
);

export default createAppContainer(RootStack);

