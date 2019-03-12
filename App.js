import React from 'react';
import { Font } from 'expo';
import { Button, Image, Alert, Text, View, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { Tabs } from './navigation'
import { Login, Settings } from './views'
import { createAppContainer, createStackNavigator} from 'react-navigation';
import { isSignedIn, handshake } from './auth/';
import { EventRegister } from 'react-native-event-listeners';
import { RoundedCard, LoginView } from './components';
import DropdownAlert from 'react-native-dropdownalert';

const RootStack = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null,
		}
	},
	Settings: {
		screen: Settings
	},

},
{
	defaultNavigationOptions: {
		headerStyle: {
      backgroundColor: '#FFF',
      elevation: 0,
      shadowOpacity: 0.3,
      borderBottomColor:'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#2699FB',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
      fontSize: 14
    },
	}
});

const AuthStack = (authorized) => createStackNavigator({
	Home: {
		screen: RootStack,
		navigationOptions: {
			header: null,
			gesturesEnabled: false
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
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6,
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  	justifyContent: 'center',
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
			isConnected: false,
			fontLoaded: false,
			error: ''
		}
	}

	async componentDidMount() {
		this.loadNetwork();
		await Font.loadAsync({
      'Helvetica Neue': require('./assets/fonts/HelveticaNeue.ttf'),
    });
		this.setState({ fontLoaded: true })
		EventRegister.addEventListener('begin_logout', (data) => {
        this.setState({ authorized: false, checkedAuth: false });
    })
    EventRegister.addEventListener('logout', (data) => {
        this.loadNetwork();
    })
    EventRegister.addEventListener('load_main', (data) => {
        this.setState({ authorized: true, checkedAuth: true });
    })
	}

	async loadNetwork() {
		handshake()
			.then(() => {
				this.setState({ isConnected: true });
				isSignedIn()
					.then((valid) => {
						this.setState({ checkedAuth: true });
						if (valid) 
							this.setState({ authorized: true });
					})
					.catch((err) => {
						this.setState({ 
							authorized: false, 
							checkedAuth: true, 
							error: err 
						});
					})
			})
			.catch((err) => {
				this.setState({ checkedAuth: true, isConnected: false, error: err });
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
		var loading = (!this.state.checkedAuth || !this.state.fontLoaded);
		return (
			<View style={{ flex: 1, justifyContent: 'flex-end', height: '100%' }}>
        <LoginView hide={loading}>
        	<Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>An error has occurred</Text>
        	<Text style={{ fontSize: 16, paddingBottom: 15 }}>{this.state.error}</Text>
        	<Button title="REFRESH" onPress={()=>{this.loadNetwork()}} />
        </LoginView>
        { loading &&
          <View style={[styles.overlay]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
        <DropdownAlert ref={ref => this.dropdown = ref} inactiveStatusBarStyle={'default'} />
      </View>
		);
	}

	render() {
		const Layout = createAppContainer(AuthStack(this.state.authorized));

		if (!this.state.isConnected || !this.state.checkedAuth || !this.state.fontLoaded) 
			return this.networkFailed();

		return (
				<Layout />
		);
	}
}
