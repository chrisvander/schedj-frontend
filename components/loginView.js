import React from 'react';
import { LinearGradient } from 'expo';
import RoundedCard from './roundedCard';
import Fade from './fade';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, SafeAreaView, Keyboard } from 'react-native';

export default class LoginView extends React.Component {
  componentWillMount() {
    this.setState({ keyboardPresent: false });
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardWillShow',
      ()=>this.setState({ keyboardPresent: true }),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      ()=>this.setState({ keyboardPresent: false }),
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

	render() {
		return (
			<LinearGradient
          colors={['#FFFFFF', '#53B7FD']}
          style={{ padding: 24 }}
          start={[0.33,0.33]}>
          <SafeAreaView style={{ alignItems: 'center', height: '100%' }}>
            <Fade visible={!this.state.keyboardPresent}>
              <Image 
                style={{ alignSelf: 'center', position: 'absolute', top: 43 }} 
                source={require('../assets/sis_man.png')} 
              />
            </Fade>
            {!this.props.hide &&
            	<KeyboardAvoidingView keyboardVerticalOffset={-100} style={{flex: 1}} behavior="position" enabled>
	            	<RoundedCard style={{marginTop: 200, flexDirection: 'column', alignItems: 'stretch' }}>
		            	{this.props.children}
		            </RoundedCard>
		          </KeyboardAvoidingView>
            }
          </SafeAreaView>
        </LinearGradient>
		);
	}
}