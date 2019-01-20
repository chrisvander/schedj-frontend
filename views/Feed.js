import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { FeedStyle, NavStyle } from '../styles';
import { LargeNavBar } from '../components';

export default class FeedScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
      	<LargeNavBar title="Christian" preTitle="WELCOME"/>
      </View>
    );
  }
} 