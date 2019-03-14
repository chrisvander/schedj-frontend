import React from 'react';
import { WebBrowser } from 'expo'
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
import { LargeNavBar, RoundedCard, CardAnimated } from '../components';
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
	},
	holdsCard: {
		backgroundColor: '#FF9191', 
		padding: 10,
		paddingLeft: 20,
		paddingRight: 20,
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 17
	},
	holdsTitle: {
		fontFamily: 'Helvetica Neue',
		color: 'black',
		fontWeight: 'bold',
		fontSize: 23,
		marginTop: 5,
		marginLeft: 10
	},
	holdsContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end'
	},
	alertImg: {
		width: 40,
		height: 40,
		marginBottom: 5
	}
});

_openHoldsAsync = async () => {
	try {
		await WebBrowser.openBrowserAsync(globals.ROUTES.fetch + 'rss/bwskoacc.P_ViewHold');
	}
  catch (err) {
  	console.log(err);
  }
};

const HoldsCard = () => {
	if (globals.HOLDS) return (
	    <CardAnimated onPress={_openHoldsAsync}>
		    <RoundedCard style={[styles.holdsCard]}>
		    	<View style={[styles.holdsContainer]}>
		    		<Image 
		    			style={[ styles.alertImg ]} 
							source={require('../assets/icons/warning.png')} 
							resizeMode="cover"
						/>
		      	<Text style={[styles.holdsTitle]}>
		      		You have a hold
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
	   	</CardAnimated>
		);
	return (<React.Fragment />);
}

const RegistrationCard = () => {
	return (
		<React.Fragment>{ !globals.REGISTRATION.end_passed && 
	    <CardAnimated onPress={()=>{}}>
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
	   	</CardAnimated>}
	  </React.Fragment>
	);
}

export default class FeedScreen extends React.Component {
	static navigationOptions = { header: null }
	
  render() {
  	console.log(globals)
  	return (
    	<React.Fragment>
	      <LargeNavBar navigation={this.props.navigation} shadow={false} title={globals.NAME[0]} preTitle="WELCOME"/>
	      <SafeAreaView style={{margin: 16, marginTop: 30}}>
	      	<HoldsCard />
		      <RegistrationCard />
	      </SafeAreaView>
     	</React.Fragment>
    );
  }
} 