import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { FN } from '../styles'

export default class RoundedCard extends React.Component {
	render() {
		return (
			<View style={[ cardStyle.container, this.props.containerStyle ]}>
				<View style={[ cardStyle.view, this.props.style ]}>
					<View>
						{this.props.children}
					</View>
					{this.props.caret && <View style={[ cardStyle.regButton ]}>
		    		<Image 
		    			style={[ cardStyle.regButtonImg ]} 
							source={require('../assets/icons/right_caret.png')} 
							resizeMode="cover"
						/>
		    	</View>}
				</View>
			</View>
		);
	}
}

const cardStyle = StyleSheet.create({
	view: {
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		width: '100%',
		elevation: 3
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
		width: FN(50),
		height: FN(50),
		backgroundColor: 'white',
		borderRadius: 25,
		justifyContent: 'center', 
		alignItems: 'center'
	},
	regButtonImg: {
		width: 10,
		height: 15
	}
});