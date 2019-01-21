import React from 'react';
import { Text, View } from 'react-native';
import { LargeNavBar } from '../components';

export default class ScheduleScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
	    	<LargeNavBar title="Schedule" />
	      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text></Text>
	      </View>
      </React.Fragment>
    );
  }
}