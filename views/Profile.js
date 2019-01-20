import React from 'react';
import { Text, View } from 'react-native';
import { LargeNavBar } from '../components';

export default class ProfileScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
    		<LargeNavBar title="Profile" />
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>Profile</Text>
	      </View>
	     </React.Fragment>
    );
  }
}