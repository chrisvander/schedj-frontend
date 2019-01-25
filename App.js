import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
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
	Settings: {
		screen: Settings
	},
});

const AuthStack = createStackNavigator({
	Home: {
		screen: RootStack,
		navigationOptions: {
			header: null
		}
	},
	Login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	}
},
{
  mode: 'modal',
  headerMode: 'none',
});

var MainView = createAppContainer(AuthStack);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

export default class App extends React.Component {
	constructor() {
		super();
		this.state = {
			authorized: false
		}
	}

	componentDidMount() {

	}

	loading() {
		return (
			<SafeAreaView style={[ styles.container, styles.horizontal ]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	render() {
		if (this.state.authorized)
			return (<MainView />);
		else return this.loading();
	}
}
