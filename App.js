import React from 'react';
import { Font } from 'expo';
import { Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from './navigation'
import { Login, Settings } from './views'
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { isSignedIn } from './auth/';

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
  }
})

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authorized: false,
			checkedAuth: false,
			fontLoaded: false
		}
	}

	async componentDidMount() {
		isSignedIn()
			.then((valid) => {
				if (valid) 
					this.setState({ authorized: true });
				this.setState({ checkedAuth: true });
			})
			.catch((err) => {
				this.setState({ checkedAuth: true });
			})
		await Font.loadAsync({
      'Helvetica Neue': require('./assets/fonts/HelveticaNeue.ttf'),
    });
		this.setState({ fontLoaded: true })
	}

	loading() {
		return (
			<SafeAreaView style={[ styles.container, styles.horizontal ]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</SafeAreaView>
		);
	}

	render() {
		const Layout = createAppContainer(AuthStack(this.state.authorized));

		if (!this.state.checkedAuth || !this.state.fontLoaded) 
			return this.loading();

		return <Layout />;
	}
}
