import React from 'react';
import { LinearGradient } from 'expo';
import RoundedCard from './roundedCard';
import { StyleSheet, Text, View, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';

export default class LoginView extends React.Component {
	render() {
		return (
			<LinearGradient
          colors={['#FFFFFF', '#53B7FD']}
          style={{ padding: 24 }}
          start={[0.33,0.33]}>
          <SafeAreaView style={{ alignItems: 'center', height: '100%' }}>
            <Image style={{ marginTop: 43, marginBottom: 30 }} source={require('../assets/sis_man.png')} />
            {!this.props.hide &&
            	<KeyboardAvoidingView keyboardVerticalOffset={-100} style={{flex: 1}} behavior="position" enabled>
	            	<RoundedCard style={{flexDirection: 'column', alignItems: 'stretch' }}>
		            	{this.props.children}
		            </RoundedCard>
		          </KeyboardAvoidingView>
            }
          </SafeAreaView>
        </LinearGradient>
		);
	}
}