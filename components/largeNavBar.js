import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavStyle } from '../styles';

export default class LargeNavBar extends React.Component {
	render() {
		return (
			<View style={[ NavStyle.largeNavBarView ]}>
				<Text style={[NavStyle.subTitle]}>{this.props.preTitle}</Text>
				<Text style={[ NavStyle.bigTitle ]}>{this.props.title}</Text>
			</View>
		);
	}
}