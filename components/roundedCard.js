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
import { FN } from '../styles';

const rightCaret = require('../assets/icons/right_caret.png');

const cardStyle = StyleSheet.create({
  view: {
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
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
    shadowColor: '#000000',
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
    backgroundColor: 'white',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F1F9FF',
  },
  regButtonImg: {
    width: 10,
    height: 15,
  },
});

export const RoundedCardTitle = ({ children }) => (
  <Text style={{
    fontFamily: 'Helvetica Neue',
    color: 'black',
    fontWeight: 'bold',
    fontSize: FN(26),
    alignSelf: 'stretch',
  }}
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

const caretComp = () => (
  <View style={[cardStyle.regButton]}>
    <Image
      style={[cardStyle.regButtonImg]}
      source={rightCaret}
      resizeMode="cover"
    />
  </View>
);

export default
function RoundedCard({
  onPress, containerStyle, children, caret, right, style, color, title,
}) {
  return (
    <Animation onPress={onPress}>
      <View style={[
        cardStyle.container,
        containerStyle,
      ]}
      >
        <View style={[
          cardStyle.view,
          style,
          color === 'blue' ? { backgroundColor: '#CCEAFF' } : {},
        ]}
        >
          <View>
            {title
              ? <RoundedCardTitle>{title}</RoundedCardTitle>
              : <React.Fragment />}
            {children}
          </View>
          {caret && caretComp()}
          {right}
        </View>
      </View>
    </Animation>
  );
}
