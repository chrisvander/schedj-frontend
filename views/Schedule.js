import React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { LargeNavBar } from '../components';

export default class ScheduleScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
	    	<LargeNavBar navigation={this.props.navigation} title="Schedule" />
	      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        <Text>hello</Text>
	      </SafeAreaView>
      </React.Fragment>
    );
  }
}