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
import { FN } from '../styles';
import { LargeNavBar, RoundedCard, CardAnimated } from '../components';
import globals from '../globals.js';

const styles = StyleSheet.create({
	registrationCard: {
		backgroundColor: '#CCEAFF', 
		padding: FN(20),
		justifyContent: 'space-between',
		flexDirection: 'row',
		display: 'flex'
	},
	regSuperTitle: {
		fontFamily: 'Helvetica Neue',
		fontWeight: '500',
		fontSize: FN(18),
		color: '#677791'
	},
	regTitle: {
		fontFamily: 'Helvetica Neue',
		color: 'black',
		fontWeight: 'bold',
		fontSize: FN(21),
		marginBottom: 5
	},
	regTitleContainer: {
		flexDirection: 'column',
		alignSelf: 'center'
	},
	regButtonImg: {
		width: 10,
		height: 15
	},
	holdsCard: {
		backgroundColor: '#FF9191', 
		padding: FN(10),
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
		fontSize: FN(23),
		lineHeight: FN(40),
		marginLeft: FN(10)
	},
	holdsContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end'
	},
	alertImg: {
		width: FN(40),
		height: FN(40),
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
	if (globals.HOLDS) 
		return (
	    <CardAnimated onPress={_openHoldsAsync}>
		    <RoundedCard style={[styles.holdsCard]} caret={true}>
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
		    </RoundedCard>
	   	</CardAnimated>
		);
	return null;
}

const RegistrationCard = () => {
	if (!globals.REGISTRATION.end_passed) return (
		<CardAnimated onPress={()=>{}}>
	    <RoundedCard style={[styles.registrationCard]} caret={true}>
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
	    </RoundedCard>
   	</CardAnimated>
	);
	return null;
}

export default class FeedScreen extends React.Component {
	static navigationOptions = { header: null }
	
  render() {
  	return (
    	<ScrollView>
	      <LargeNavBar navigation={this.props.navigation} shadow={false} title={globals.NAME[0]} preTitle="WELCOME"/>
	      <SafeAreaView style={{margin: 16, marginTop: 30}}>
	      	<HoldsCard />
		      <RegistrationCard />
	      </SafeAreaView>
     	</ScrollView>
    );
  }
} 