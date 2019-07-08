import React from 'react';
import { LinearGradient } from 'expo';
import {
  Image, KeyboardAvoidingView, SafeAreaView, Keyboard,
} from 'react-native';
import RoundedCard from './roundedCard';
import Fade from './fade';

const sisMan = require('../assets/sis_man.png');

export default class LoginView extends React.Component {
  componentWillMount() {
    this.setState({ keyboardPresent: false });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShown.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHidden.bind(this));
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  keyboardShown() {
    this.setState({ keyboardPresent: true });
  }

  keyboardHidden() {
    this.setState({ keyboardPresent: false });
  }

  render() {
    const { keyboardPresent } = this.state;
    const { hide, children } = this.props;
    return (
      <LinearGradient
        colors={['#FFFFFF', '#53B7FD']}
        style={{ padding: 24 }}
        start={[0.33, 0.33]}
      >
        <SafeAreaView style={{ alignItems: 'center', height: '100%' }}>
          <Fade visible={!keyboardPresent}>
            <Image
              style={{ alignSelf: 'center', position: 'absolute', top: 43 }}
              source={sisMan}
            />
          </Fade>
          {!hide
            && (
              <KeyboardAvoidingView keyboardVerticalOffset={-100} style={{ flex: 1 }} behavior="position" enabled>
                <RoundedCard style={{ marginTop: 200, flexDirection: 'column', alignItems: 'stretch' }}>
                  {children}
                </RoundedCard>
              </KeyboardAvoidingView>
            )
          }
        </SafeAreaView>
      </LinearGradient>
    );
  }
}
