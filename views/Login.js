import React from 'react';
import { 
  Image, 
  Keyboard, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  Text, 
  View, 
  TextInput, 
  KeyboardAvoidingView,
  TouchableWithoutFeedback
} from 'react-native';
import Button from 'react-native-button';
import { RoundedCard } from '../components';
import { LoginStyle } from '../styles';
import { LinearGradient } from 'expo';

export default class FeedScreen extends React.Component {
  componentWillMount() {
    this.sis_man = (<Image style={{ marginTop: 43, marginBottom: 30 }} source={require('../assets/sis_man.png')} />);
  }

  login(nav) {
    nav('Home');
  }

  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end', height: '100%' }}>
      	<LinearGradient
          colors={['#FFFFFF', '#53B7FD']}
          style={{ padding: 24, alignItems: 'center', height: '100%' }}
          start={[0.33,0.33]}>
          <SafeAreaView style={{ alignItems: 'center', height: '100%', width:'100%' }}>
          	{this.sis_man}
            <KeyboardAvoidingView keyboardVerticalOffset={-100} style={{flex: 1}} behavior="position" enabled>
  	          <RoundedCard style={{padding:23}}>
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
                  />
  	          	</View>
            		<Button 
            			activeOpacity={0.7}
            			color='#FFFFFF' 
            			style={[LoginStyle.button]} 
            			containerStyle={[LoginStyle.buttonContainer]}
            			onPress={()=>this.login(navigate)}
            		>
            			LOGIN
            		</Button>
            		<View style={{justifyContent: 'center', alignItems: 'center'}}>
  		          	<Text style={[LoginStyle.privacy]}>By logging into SIS, you agree to our</Text>
  		          	<Text style={[LoginStyle.privacy]}>Terms of Service and Privacy Policy</Text>
  	          	</View>
  	          </RoundedCard>
            </KeyboardAvoidingView>
	        </SafeAreaView>
        </LinearGradient>
      </View>
    );
  }
} 