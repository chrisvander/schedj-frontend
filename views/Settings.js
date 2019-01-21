import React from 'react';
import { Text, View } from 'react-native';
import { LargeNavBar } from '../components';

export default class SettingsScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>Settings</Text>
	      </View>
      </React.Fragment>
    );
  }
}