import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, KeyboardAvoidingView, SafeAreaView } from 'react-native';

const icons = {
	gear: require('../assets/icons/gear.png'),
	help: require('../assets/icons/help.png'),
	lock: require('../assets/icons/lock.png'),
	logout: require('../assets/icons/logout.png'),
	notification: require('../assets/icons/notification.png'),
	profile: require('../assets/icons/profile.png'),
	right_caret: require('../assets/icons/right_caret.png')
}

const styles = StyleSheet.create({
  
})

export default class BasicTableView extends React.Component {
	render() {

		return (
			<View>
				{this.props.data.map(section => (
					<TouchableOpacity 
						key={section.title} 
						onPress={section.onPress}>
						<Image source={icons[section.icon]}/>
						<Text>
							{section.title}
						</Text>
						<Image source={icons.right_caret}/>
					</TouchableOpacity>
		    ))}
			</View>
		);
	}
}