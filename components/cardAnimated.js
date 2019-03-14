import React from 'react';
import { 
	View, 
	Animated,
	Easing,
	TouchableOpacity } from 'react-native';
import globals from '../globals.js';

export default class CardAnimated extends React.Component {
	render() {
		let scaleValue = new Animated.Value(0);
		const cardScale = scaleValue.interpolate({
	    inputRange: [0, 0.5, 1],
	    outputRange: [1, 0.95, 0.92]
	  });
		return (
			<TouchableOpacity 
	    	activeOpacity={1.0}
	      onPressIn={() => {
	        scaleValue.setValue(0);
	        Animated.timing(scaleValue, {
	          toValue: 1,
	          duration: 250,
	          easing: Easing.linear,
	          useNativeDriver: true
	        }).start();
	      }}
	      onPressOut={() => {
	        Animated.timing(scaleValue, {
	          toValue: 0,
	          duration: 160,
	          easing: Easing.linear,
	          useNativeDriver: true
	        }).start();
	    	}}
	    	onPress={this.props.onPress}>
	    	<Animated.View style={{transform: [{ scale: cardScale }]}}>
		      {this.props.children}
	      </Animated.View>
	   	</TouchableOpacity>
	  );
	}
}