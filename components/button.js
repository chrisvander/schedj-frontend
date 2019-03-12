import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  buttonContainer: {
		borderRadius: 7,
		backgroundColor: '#2699FB',
		marginTop: 16,
		marginBottom: 16
	},
	button: {
		padding: 16.5,
		color: 'white',
		fontSize: 12,
		fontWeight: 'bold'
	},
})

export default class SButton extends React.Component {
	render() {
		return (
			<Button 
        activeOpacity={0.7}
        color='#FFFFFF' 
        style={[styles.button]} 
        containerStyle={[styles.buttonContainer]}
        onPress={this.props.onPress}
      >
      {this.props.children.toUpperCase()}
      </Button>
		);
	}
}