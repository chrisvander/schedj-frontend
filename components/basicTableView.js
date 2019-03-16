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
  section: {
  	display: 'flex',
  	flexDirection: 'row',
  	width: '100%',
  	paddingLeft: 30,
  	paddingRight: 30,
  	padding: 16
  },
  icon: {
  	width: 16,
  	height: 16
  },
  title: {
  	flexGrow: 1,
  	fontSize: 14,
  	fontFamily: 'Arial',
  	fontWeight: 'bold',
  	color: '#2699FB',
  	paddingLeft: 32
  },
  caret: {

  }
})

export default class BasicTableView extends React.Component {
	render() {
		return (
			<React.Fragment>
				{this.props.data.map(section => (
					<TouchableOpacity 
						key={section.title} 
						onPress={section.onPress}
						style={[styles.section]}>
						<Image style={[styles.icon]} source={icons[section.icon]}/>
						<Text style={[styles.title]}>
							{section.title}
						</Text>
						<Image style={[styles.caret]} source={icons.right_caret}/>
					</TouchableOpacity>
		    ))}
			</React.Fragment>
		);
	}
}