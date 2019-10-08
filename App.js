import React from 'react';
import {
  Button, Text, View, ActivityIndicator, StyleSheet, StatusBar,
} from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import { EventRegister } from 'react-native-event-listeners';
import DropdownAlert from 'react-native-dropdownalert';
import * as Font from 'expo-font';
import { Tabs } from './navigation';
import { Login, Settings } from './views';
import { isSignedIn, handshake } from './auth';
import { LoginView } from './components';

const helveticaFont = require('./assets/fonts/HelveticaNeue.ttf');
const arialFont = require('./assets/fonts/Arial.ttf');

const AuthStack = authorized => createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  Settings: {
    screen: Settings,
  },
},
{
  defaultNavigationOptions: {
    headerTintColor: '#2699FB',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
      fontSize: 14,
    },
  },
  initialRouteName: authorized ? 'Home' : 'Login',
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false,
      checkedAuth: false,
      isConnected: false,
      fontLoaded: false,
      error: '',
    };
  }

  async componentDidMount() {
    this.loadNetwork();
    await Font.loadAsync({
      'Helvetica Neue': helveticaFont,
      'Arial': arialFont,
    });
    this.setState({ fontLoaded: true });
    EventRegister.addEventListener('begin_logout', () => {
      this.setState({ authorized: false, checkedAuth: false });
    });
    EventRegister.addEventListener('logout', () => {
      this.loadNetwork();
    });
    EventRegister.addEventListener('load_main', () => {
      this.setState({ authorized: true, checkedAuth: true });
    });
  }

  async loadNetwork() {
    handshake()
      .then(() => {
        this.setState({ isConnected: true });
        isSignedIn()
          .then((valid) => {
            this.setState({ checkedAuth: true });
            if (valid) this.setState({ authorized: true });
          })
          .catch((err) => {
            this.setState({
              authorized: false,
              checkedAuth: true,
              error: err,
            });
          });
      })
      .catch((err) => {
        this.setState({ checkedAuth: true, isConnected: false, error: err.toString() });
        console.error(err);
      });
  }

  networkFailed() {
    const { checkedAuth, fontLoaded, error } = this.state;
    const loading = (!checkedAuth || !fontLoaded);
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end', height: '100%' }}>
        <StatusBar backgroundColor="blue" barStyle="dark-content" />
        <LoginView hide={loading}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, paddingBottom: 10 }}>An error has occurred</Text>
          <Text style={{ fontSize: 16, paddingBottom: 15 }}>{error}</Text>
          <Button title="REFRESH" onPress={() => { this.loadNetwork(); }} />
        </LoginView>
        { loading
          && (
          <View style={[styles.overlay]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          )
        }
        <DropdownAlert ref={(ref) => { this.dropdown = ref; }} inactiveStatusBarStyle="default" />
      </View>
    );
  }

  render() {
    const {
      authorized, isConnected, checkedAuth, fontLoaded,
    } = this.state;
    const Layout = createAppContainer(AuthStack(authorized));
    if (!isConnected || !checkedAuth || !fontLoaded) return this.networkFailed();
    return (<Layout />);
  }
}
