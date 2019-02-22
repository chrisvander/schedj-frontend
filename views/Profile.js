import React from 'react';
import { Text, View, Button } from 'react-native';
import { LargeNavBar } from '../components';

export default class ProfileScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
    		<LargeNavBar navigation={this.props.navigation} title="Profile" />
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>Profile</Text>
	      </View>
	     </React.Fragment>
    );
  }
}