import React from 'react';
import {
  View,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import { Appearance } from 'react-native-appearance';
import { FN } from '../styles';

const rightCaret = require('../assets/icons/right_caret.png');

const cardStyle = dark => StyleSheet.create({
  view: {
    borderRadius: 20,
    backgroundColor: dark ? '#272727' : '#FFFFFF',
    width: '100%',
    elevation: 6,
    padding: FN(18),
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  container: {
    shadowColor: dark ? '#171717' : '#000000',
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0,
    },
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  regButton: {
    width: FN(45),
    height: FN(45),
    backgroundColor: dark ? '#444444' : '#FFFFFF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: dark ? '#343434' : '#F1F9FF',
  },
  regButtonImg: {
    width: 10,
    height: 15,
  },
});

export const RoundedCardTitle = ({ children, style }) => (
  <Text style={[{
    fontFamily: 'Helvetica Neue',
    color: 'black',
    fontWeight: 'bold',
    fontSize: FN(26),
    alignSelf: 'stretch',
  }, style]}
  >
    {children}
  </Text>
);

class Animation extends React.Component {
  render() {
    const { onPress, children } = this.props;
    const scaleValue = new Animated.Value(0);
    const cardScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.95, 0.92],
    });
    if (onPress) {
      return (
        <TouchableOpacity
          activeOpacity={1.0}
          onPressIn={() => {
            scaleValue.setValue(0);
            Animated.timing(scaleValue, {
              toValue: 1,
              duration: 250,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.timing(scaleValue, {
              toValue: 0,
              duration: 160,
              easing: Easing.linear,
              useNativeDriver: true,
            }).start();
          }}
          onPress={onPress}
        >
          <Animated.View style={{ transform: [{ scale: cardScale }] }}>
            {children}
          </Animated.View>
        </TouchableOpacity>
      );
    }
    return children;
  }
}

const caretComp = dark => (
  <View style={[cardStyle(dark).regButton]}>
    <Image
      style={[cardStyle(dark).regButtonImg]}
      source={rightCaret}
      resizeMode="cover"
    />
  </View>
);

export default class RoundedCard extends React.Component {
  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  render() {
    const {
      onPress, containerStyle, children, caret, right, style, color, title,
    } = this.props;
    const { dark } = this.state;
    return (
      <Animation onPress={onPress}>
        <View style={[
          cardStyle(dark).container,
          containerStyle,
        ]}
        >
          <View style={[
            cardStyle(dark).view,
            style,
            color === 'blue' ? { backgroundColor: dark ? '#335166' : '#CCEAFF' } : {},
          ]}
          >
            <View>
              {title
                ? <RoundedCardTitle style={{ color: dark ? 'white' : 'black' }}>{title}</RoundedCardTitle>
                : <React.Fragment />}
              {children}
            </View>
            {caret && caretComp(dark)}
            {right}
          </View>
        </View>
      </Animation>
    );
  }
}

