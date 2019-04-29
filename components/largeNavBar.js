import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavStyle, FN } from '../styles';

export default class LargeNavBar extends React.Component {
	settings = () => {
		this.props.navigation.navigate('Settings');
	}

	render() {
		var shadow = {shadowOpacity: 0.16, shadowRadius: 10};
		if (this.props.shadow == false) shadow = {shadowOpacity: 0.0};
		return (
			<React.Fragment>
				<View style={[ 
					shadow, 
					this.props.fixed ? 
						{position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1} : 
						{}, 
					{backgroundColor:'#FFFFFF'}]
				}>
					<SafeAreaView>
						<View style={[NavStyle.largeNavBarView]}>
							<View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
								<Text style={[NavStyle.subTitle]}>{this.props.preTitle}</Text>
								<Text style={[ NavStyle.bigTitle ]}>{this.props.title}</Text>
							</View>
							{!this.props.gearHidden && <View style={[ NavStyle.gearContainer ]}>
								<TouchableOpacity onPress={this.settings}>
									<Image 
										style={[ NavStyle.gear ]} 
										source={require('../assets/icons/gear.png')} 
										defaultSource={require('../assets/icons/gear.png')}
										resizeMode="cover"
									/>
								</TouchableOpacity>
							</View>}
						</View>
					</SafeAreaView>
				</View>
				{this.props.fixed && <SafeAreaView style={{height: FN(120)}}/>}
			</React.Fragment>
		);
	}
}