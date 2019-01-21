import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavStyle } from '../styles';

export default class LargeNavBar extends React.Component {
	settings = () => {
		
	}

	render() {
		var shadow = {shadowOpacity: 0.16};
		if (this.props.shadow == false) shadow = {shadowOpacity: 0.0};
		return (
			<View style={[ NavStyle.largeNavBarContainer, shadow ]}>
				<View style={{backgroundColor:'#FFFFFF'}}>
					<SafeAreaView>
						<View style={[ NavStyle.largeNavBarView ]}>
							<View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
								<Text style={[NavStyle.subTitle]}>{this.props.preTitle}</Text>
								<Text style={[ NavStyle.bigTitle ]}>{this.props.title}</Text>
							</View>
							<View style={[ NavStyle.gearContainer ]}>
								<TouchableHighlight onPress={this.settings}>
									<Image style={[ NavStyle.gear ]} source={require('../assets/gear.png')}/>
								</TouchableHighlight>
							</View>
						</View>
					</SafeAreaView>
				</View>
			</View>
		);
	}
}