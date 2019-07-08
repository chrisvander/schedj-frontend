import React from 'react';
import { Text, View } from 'react-native';

export default class GradesScreen extends React.Component {
  static navigationOptions = {
    title: 'COURSE SEARCH',
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text> Course Search </Text>
      </View>
    );
  }
}
