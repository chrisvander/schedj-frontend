import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Image, KeyboardAvoidingView, SafeAreaView, Keyboard,
} from 'react-native';
import { Appearance } from 'react-native-appearance';
import RoundedCard from './roundedCard';
import Fade from './fade';


const sisMan = require('../assets/sis_man.png');
let subscription;

export default class LoginView extends React.Component {
  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
    this.setState({ keyboardPresent: false });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardWillShow', this.keyboardShown.bind(this));
    this.keyboardDidHideListener = Keyboard.addListener('keyboardWillHide', this.keyboardHidden.bind(this));
  }

  componentWillUnmount() {
    this.appearance.remove();
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
    const { keyboardPresent, dark } = this.state;
    const { hide, children } = this.props;
    let gradientColors = ['#FFFFFF', '#53B7FD'];
    if (dark) gradientColors = ['#000000', '#275779'];
    return (
      <LinearGradient
        colors={gradientColors}
        style={{ padding: 24 }}
        start={[0.33, 0.33]}
      >
        <SafeAreaView style={{ alignItems: 'center', height: '100%' }}>
          <Fade visible={!keyboardPresent}>
            {!dark ? 
              <Image
                style={{ alignSelf: 'center', position: 'absolute', top: 43 }}
                source={sisMan}
              /> 
            : <React.Fragment />}
          </Fade>
          {!hide
            && (
              <KeyboardAvoidingView keyboardVerticalOffset={-100} style={{ flex: 1 }} behavior="position" enabled>
                <RoundedCard style={{ marginTop: 200, flexDirection: 'column', alignItems: 'stretch', backgroundColor: dark ? '#171717' : 'white' }}>
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
