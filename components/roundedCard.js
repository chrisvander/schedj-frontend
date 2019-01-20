import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class RoundedCard extends React.Component {
	render() {
		return (
			<View style={[ cardStyle.container, this.props.containerStyle ]}>
				<View style={[ cardStyle.view, this.props.style ]}>
					{this.props.children}
				</View>
			</View>
		);
	}
}

const cardStyle = StyleSheet.create({
	view: {
		borderRadius: 20,
		backgroundColor: '#FFFFFF',
		height: 400,
		width: '100%',
		elevation: 3,
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
    height: '100%'
	}
});