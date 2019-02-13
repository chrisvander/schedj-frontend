import React from 'react';
import { Font } from 'expo';
import { Button, Alert, Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from './navigation'
import { Login, Settings } from './views'
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { isSignedIn } from './auth/';
import { EventRegister } from 'react-native-event-listeners';

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

const AuthStack = (authorized) => createStackNavigator({
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
  initialRouteName: authorized ? 'Home' : 'Login'
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
})

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false,
			checkedAuth: false,
			isConnected: true,
			fontLoaded: false
		}
	}

	async loadNetwork() {
		try {
			isSignedIn()
				.then((valid) => {
					if (valid) 
						this.setState({ authorized: true });
					this.setState({ checkedAuth: true });
				})
				.catch((err) => {
					this.setState({ authorized: false, checkedAuth: true });
					if (err)
						Alert.alert(
				      "Network Error",
				      err,
				      { cancelable: false }
				    );
				})
		}
		catch (err) {
			this.deauthorize();
			this.setState({ isConnected: false });
			
		}
	}

	async componentDidMount() {
		await Font.loadAsync({
      'Helvetica Neue': require('./assets/fonts/HelveticaNeue.ttf'),
    });
		this.setState({ fontLoaded: true })
		this.loadNetwork();

		EventRegister.addEventListener('begin_logout', (data) => {
        this.setState({ authorized: false, checkedAuth: false });
    })
    EventRegister.addEventListener('logout', (data) => {
        this.loadNetwork();
    })
	}

	loading() {
		return (
			<SafeAreaView style={[ styles.container, styles.horizontal ]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	networkFailed() {
		return (
			<SafeAreaView style={[ styles.container, styles.horizontal ]}>
				<Button title="Refresh" onPress={() => {
					this.setState({ authorized: false, checkedAuth: false, isConnected: true, });
					this.loadNetwork();
				}}/>
			</SafeAreaView>
		);
	}

	render() {
		const Layout = createAppContainer(AuthStack(this.state.authorized));

		if (!this.state.isConnected)
			return this.networkFailed();

		if (!this.state.checkedAuth || !this.state.fontLoaded) 
			return this.loading();

		return (
				<Layout />
		);
	}
}
