import React from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { LargeNavBar } from '../components';

export default class ProfileScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
    		<LargeNavBar navigation={this.props.navigation} title="Profile" />
	      <ScrollView>
	        
	      </ScrollView>
	     </React.Fragment>
    );
  }
}