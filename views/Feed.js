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
import { EventRegister } from 'react-native-event-listeners';
import { FN } from '../styles';
import { LargeNavBar, RoundedCard, RoundedCardTitle, UpNext } from '../components';
import * as Animatable from 'react-native-animatable';
import globals from '../globals.js';

const styles = StyleSheet.create({
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
		lineHeight: FN(50),
		marginLeft: FN(10)
	},
	holdsContainer: {
		flexDirection: 'row',
		alignSelf: 'flex-end'
	},
	alertImg: {
		width: FN(50),
		height: FN(50),
	},
	importantBg: {
		marginTop: 5,
		backgroundColor: '#DEDEDE',
		padding: 16,
		paddingTop: 10,
		paddingBottom: 10
	},
	importantText: {
		fontWeight: 'bold',
		fontSize: 16,
		color: '#5C5C5C',
		paddingBottom: 10
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

const HoldsCard = (props) => {
	if (props.holds) 
		return (
			<Animatable.View animation={"fadeIn"}>
		    <RoundedCard onPress={_openHoldsAsync} style={[styles.holdsCard]} caret={true}>
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
			</Animatable.View>
		);
	return null;
}

const RegistrationCard = (props) => {
	if (props.state.reg) return (
		<Animatable.View animation={"fadeIn"}>
			<RoundedCard onPress={()=>{props.navigation.navigate('Schedule')}} style={{ backgroundColor: '#CCEAFF' }} caret={true}>
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
   	</Animatable.View>
	);
	return null;
}

export default class FeedScreen extends React.Component {
	componentWillMount() {
		this.setState({ holds: false, reg: globals.REGISTRATION.start_date && !globals.REGISTRATION.end_passed });
		if (globals.HOLDS) this.setState({ holds: globals.HOLDS });
		else EventRegister.addEventListener('load_holds', () => this.setState({ holds: globals.HOLDS }));
	}

	componentWillUnmount() {
		EventRegister.removeEventListener('load_holds');
	}
	static navigationOptions = { header: null }
	
  render() {
  	return (
      <ScrollView>
      	<LargeNavBar navigation={this.props.navigation} shadow={false} title={globals.NAME[0]} preTitle="WELCOME"/>
	      <SafeAreaView>
	      	<Animatable.View animation={"fadeIn"}>
	      		{ (this.state.holds || this.state.reg) && 
	      			<View style={[styles.importantBg]}>
			      		<Text style={[styles.importantText]}>IMPORTANT</Text>
				      	<HoldsCard holds={this.state.holds}/>   	
					      <RegistrationCard state={this.state} navigation={this.props.navigation}/>    
				      </View> 
	      		}	
		      </Animatable.View>
		      <View style={{ margin: 16, marginTop: 20 }}>
	      		<UpNext />
	      		<RoundedCard onPress={()=>{this.props.navigation.navigate('Manage')}} color={'blue'} caret={true} title={'Manage Courses'}/>
            <RoundedCard color={'blue'} caret={true} title={'Course Search'}/>
	      	</View>
	      </SafeAreaView>
     	</ScrollView>
    );  
  }
} 