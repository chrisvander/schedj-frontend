import React from 'react';
import { 
	View, 
	Animated,
	Easing,
	TouchableOpacity,
	StyleSheet, 
	Text, 
	Image } from 'react-native';
import { FN } from '../styles'
import globals from '../globals.js';

export class RoundedCardTitle  extends React.Component {
	render() {
		return (
			<Text style={{
				fontFamily: 'Helvetica Neue',
				color: 'black',
				fontWeight: 'bold',
				fontSize: FN(26),
				alignSelf: 'stretch'
			}}>{this.props.children}</Text>
		);
	}
}

class Animation extends React.Component {
	render() {
		let scaleValue = new Animated.Value(0);
		const cardScale = scaleValue.interpolate({
	    inputRange: [0, 0.5, 1],
	    outputRange: [1, 0.95, 0.92]
	  });
		if (this.props.onPress) return (
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
		else return this.props.children;
	}
}

export default class RoundedCard extends React.Component {
	render() {
		return (
			<Animation onPress={this.props.onPress}>
	      <View style={[ 
	      	cardStyle.container, 
	      	this.props.containerStyle
	      ]}>
					<View style={[ 
						cardStyle.view, 
						this.props.style, 
						this.props.color==='blue' ? { backgroundColor:'#CCEAFF' } : {} 
					]}>
						<View>
							{this.props.title ? 
								<RoundedCardTitle>{this.props.title}</RoundedCardTitle> : 
								<React.Fragment />}
							{this.props.children}
						</View>
						{this.props.caret && 
							<View style={[ cardStyle.regButton ]}>
				    		<Image 
				    			style={[ cardStyle.regButtonImg ]} 
									source={require('../assets/icons/right_caret.png')} 
									resizeMode="cover"
								/>
				    	</View>
				    }
				    {this.props.right}
					</View>
				</View>
			</Animation>
	  );
	}
}

const cardStyle = StyleSheet.create({
	view: {
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		width: '100%',
		elevation: 3,
		padding: FN(18),
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 17
	},
	container: {
		shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 10,
    shadowOffset: {
      height: 3,
      width: 0
    },
    width: '100%',
    justifyContent: 'center',
		flexDirection: 'row',
		display: 'flex'
	},
	regButton: {
		width: FN(45),
		height: FN(45),
		backgroundColor: 'white',
		borderRadius: 25,
		justifyContent: 'center', 
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#F1F9FF'
	},
	regButtonImg: {
		width: 10,
		height: 15
	}
});