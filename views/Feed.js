import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View, Button } from 'react-native';
import { FeedStyle, NavStyle } from '../styles';
import { LargeNavBar } from '../components';

export default class FeedScreen extends React.Component {
	static navigationOptions = { header: null }
	
  render() {
  	return (
    	<View>
	      <View style={{ flex: 1 }}>
	      	<LargeNavBar navigation={this.props.navigation} shadow={false} title="Christian" preTitle="WELCOME"/>
	      </View>
      </View>
    );
  }
} 