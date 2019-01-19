import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { FeedStyle, NavStyle } from '../styles';

export default class FeedScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      	<View style={{ 
      		justifyContent: 'center',
      		paddingTop: 47,
	        paddingLeft: 16 
	      }}>
	      	<Text style={[NavStyle.subTitle]}>WELCOME</Text>
	        <Text style={[NavStyle.bigTitle]}>Christian</Text>
        </View>
      </SafeAreaView>
    );
  }
} 