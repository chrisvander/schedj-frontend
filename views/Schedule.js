import React from 'react';
import { Text, View, SafeAreaView, ActivityIndicator } from 'react-native';
import { LargeNavBar } from '../components';
import { EventRegister } from 'react-native-event-listeners';
import globals from "../globals.js";

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      schedule: null
    }
  }

  componentWillMount() {
    if (globals.SCHEDULE.loaded) 
      this.setState({ loading: false, schedule: globals.SCHEDULE });
    else {
      EventRegister.addEventListener('load_schedule', (data) => {
        this.setState({ loading: false, schedule: data });
      });
    }
  }

  loading() {
    return (
      <ActivityIndicator size="large" color="#0000ff" />
    );
  }

  render() {
    return (
    	<React.Fragment>
	    	<LargeNavBar navigation={this.props.navigation} title="Schedule" />
	      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
	        {this.state.loading && this.loading()}
	      </SafeAreaView>
      </React.Fragment>
    );
  }
}