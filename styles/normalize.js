import React from 'react';
import { Dimensions, Platform, PixelRatio } from 'react-native';

const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 400;

export default function(num) {
	if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(num*scale))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(num*scale)) - 2
  }
}