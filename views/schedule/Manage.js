import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LargeNavBar, TableView, SButton, BasicTableView } from '../../components';
import globals from '../../globals.js';

export default class GradesScreen extends React.Component {
	static navigationOptions = { 
    title: "MANAGE COURSES",
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text> Manage Courses </Text>
      </View>
    );
  }
}