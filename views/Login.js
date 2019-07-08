import React from 'react';
import {
  Image,
  Keyboard,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import DropdownAlert from 'react-native-dropdownalert';
import { LoginView, SButton } from '../components';
import { LoginStyle } from '../styles';
import { signIn } from '../auth';

const sisMan = require('../assets/sis_man.png');

function dismiss() {
  Keyboard.dismiss();
}

export default class FeedScreen extends React.Component {
  componentWillMount() {
    this.sis_man = (<Image style={{ marginTop: 43, marginBottom: 30 }} source={sisMan} />);
    this.setState({ username: '', password: '', loading: false });
  }

  login() {
    dismiss();
    this.setState({ loading: true });
    const { username, password } = this.state;
    signIn(username, password)
      .then(() => {
        EventRegister.emit('load_main');
      }).catch((err, title) => {
        const header = title || 'Authentication Error';
        this.dropdown.alertWithType('error', header, err);
        this.setState({ loading: false });
      });
  }

  render() {
    const { navigation } = this.props;
    const { loading } = this.state;
    return (
      <React.Fragment>
        <LoginView>
          <Text style={[LoginStyle.rensselaerText]}>Rensselaer's</Text>
          <Text style={[LoginStyle.sisText]}>Student Information System</Text>
          <View style={[LoginStyle.textInputContainer]}>
            <TextInput
              placeholderTextColor="#BCE0FD"
              style={[LoginStyle.textInput]}
              placeholder="RIN"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => { this.passwordField.focus(); }}
              onChangeText={username => this.setState({ username })}
              blurOnSubmit={false}
            />
          </View>
          <View style={[LoginStyle.textInputContainer]}>
            <TextInput
              placeholderTextColor="#BCE0FD"
              style={[LoginStyle.textInput]}
              placeholder="Password"
              autoCorrect={false}
              secureTextEntry
              returnKeyType="go"
              ref={(input) => { this.passwordField = input; }}
              onSubmitEditing={() => this.login(navigation)}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <SButton onPress={() => this.login(navigation)}>Login</SButton>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[LoginStyle.privacy]}>
              By logging into SIS, you agree to our
              {'\n'}
              {' '}
              Terms of Service and Privacy Policy
            </Text>
          </View>
        </LoginView>
        { loading
          && (
          <View style={[LoginStyle.overlay]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
          )
        }
        <DropdownAlert ref={(ref) => { this.dropdown = ref; }} inactiveStatusBarStyle="default" />
      </React.Fragment>
    );
  }
}
