import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavStyle } from '../styles';

export default class LargeNavBar extends React.Component {
	render() {
		return (
			<View style={[ NavStyle.largeNavBarView ]}>
				<Text>{this.props.title}</Text>
			</View>
		);
	}
}