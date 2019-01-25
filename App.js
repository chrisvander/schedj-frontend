import React from 'react';
import { Text, View } from 'react-native';
import { Tabs } from './navigation'
import { Login, Settings } from './views'
import { createAppContainer, createStackNavigator} from 'react-navigation';

const RootStack = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: Login
	},
	Settings: {
		screen: Settings
	},
});

export default createAppContainer(RootStack);