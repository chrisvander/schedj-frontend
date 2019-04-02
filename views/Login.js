import React from 'react';
import { 
  Image, 
  StatusBar,
  Keyboard, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  TextInput, 
  KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import { RoundedCard, LoginView, SButton } from '../components';
import { LoginStyle } from '../styles';
import { LinearGradient } from 'expo';
import { signIn } from '../auth';
import { EventRegister } from 'react-native-event-listeners';
import DropdownAlert from 'react-native-dropdownalert';

function dismiss() {
  Keyboard.dismiss();
}

export default class FeedScreen extends React.Component {
  componentWillMount() {
    this.sis_man = (<Image style={{ marginTop: 43, marginBottom: 30 }} source={require('../assets/sis_man.png')} />);
    this.setState({ username: '', password: '', loading: false });
  }

  login(nav) {
    dismiss();
    this.setState({ loading: true });
    signIn(this.state.username, this.state.password)
      .then((valid) => {
        EventRegister.emit('load_main');
      }).catch((err, title) => {
        title = title ? title : "Authentication Error";
        this.dropdown.alertWithType('error', title, err);
        this.setState({ loading: false });
      });
  }

  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <React.Fragment>
        <LoginView>
          <Text style={[LoginStyle.rensselaerText]}>Rensselaer's</Text>
          <Text style={[LoginStyle.sisText]}>Student Information System</Text>
          <View style={[LoginStyle.textInputContainer]}>
            <TextInput 
              placeholderTextColor='#BCE0FD' 
              style={[LoginStyle.textInput]} 
              placeholder='RIN' 
              autoCorrect={false}
              keyboardType='default'
              returnKeyType='next'
              onSubmitEditing={() => { this.passwordField.focus(); }}
              onChangeText={(username) => this.setState({username})}
              blurOnSubmit={false}
            />
          </View>
          <View style={[LoginStyle.textInputContainer]}>
            <TextInput 
              placeholderTextColor='#BCE0FD' 
              style={[LoginStyle.textInput]} 
              placeholder='Password' 
              autoCorrect={false} 
              secureTextEntry={true}
              returnKeyType='go'
              ref={(input) => { this.passwordField = input; }}
              onSubmitEditing={()=>this.login(navigate)}
              onChangeText={(password) => this.setState({password})}
            />
          </View>
          <SButton onPress={()=>this.login(navigate)}>Login</SButton>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[LoginStyle.privacy]}>By logging into SIS, you agree to our {"\n"} Terms of Service and Privacy Policy</Text>
          </View>
        </LoginView>
        { this.state.loading &&
          <View style={[LoginStyle.overlay]}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        }
        <DropdownAlert ref={ref => this.dropdown = ref} inactiveStatusBarStyle={'default'} />
      </React.Fragment>
    );
  }
} 