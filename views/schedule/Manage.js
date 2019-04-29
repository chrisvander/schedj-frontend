import React from 'react';
import { Text, View } from 'react-native';

export default class GradesScreen extends React.Component {
  static navigationOptions = {
    title: 'MANAGE COURSES',
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text> Manage Courses </Text>
      </View>
    );
  }
}
