import React from 'react';
import { 
	StyleSheet, 
	SafeAreaView, 
	ScrollView, 
	Text, 
	Image,
	View, 
	Button, 
	Animated,
	Easing,
	TouchableOpacity } from 'react-native';
import { FeedStyle } from '../styles';
import { LargeNavBar, RoundedCard } from '../components';
import globals from '../globals.js';

const styles = StyleSheet.create({
	registrationCard: {
		backgroundColor: '#CCEAFF', 
		padding: 20,
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	regSuperTitle: {
		fontFamily: 'Helvetica Neue',
		fontWeight: '500',
		fontSize: 18,
		color: '#677791'
	},
	regTitle: {
		fontFamily: 'Helvetica Neue',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 21,
		marginBottom: 5
	},
	regTitleContainer: {
		flexDirection: 'column',
		alignSelf: 'flex-end'
	},
	regButton: {
		width: 50,
		height: 50,
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

export default class FeedScreen extends React.Component {
	static navigationOptions = { header: null }
	
  render() {
  	let scaleValue = new Animated.Value(0);
  	const cardScale = scaleValue.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [1, 0.95, 0.92]
    });
  	return (
    	<React.Fragment>
	      <LargeNavBar navigation={this.props.navigation} shadow={false} title={globals.NAME[0]} preTitle="WELCOME"/>
	      <SafeAreaView style={{margin: 16, marginTop: 30}}>
		      { !globals.REGISTRATION.end_passed && 
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
		      }}>
		      	<Animated.View style={{transform: [{ scale: cardScale }]}}>
				      <RoundedCard style={[styles.registrationCard]}>
				      	<View style={[styles.regTitleContainer]}>
					      	<Text style={[styles.regSuperTitle]}>
					      		Course registration {globals.REGISTRATION.start_passed ?  "ends" : "starts"} on:
					      	</Text>
					      	<Text style={[styles.regTitle]}>
					      		{ globals.REGISTRATION.start_passed ? 
					      				globals.REGISTRATION.end_date + ' at ' + globals.REGISTRATION.end_time :
					      				globals.REGISTRATION.start_date + ' at ' + globals.REGISTRATION.start_time
					      		}
					      	</Text>
				      	</View>
				      	<View style={[ styles.regButton ]}>
				      		<Image 
				      			style={[ styles.regButtonImg ]} 
										source={require('../assets/icons/right_caret.png')} 
										resizeMode="cover"
									/>
				      	</View>
				      </RoundedCard>
			      </Animated.View>
		     	</TouchableOpacity>}
	      </SafeAreaView>
     	</React.Fragment>
    );
  }
} 