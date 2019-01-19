import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default class FeedScreen extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
      	<View style={{ 
      		justifyContent: 'center',
      		paddingTop: 47,
	        paddingLeft: 16 
	      }}>
	      	<Text style={{
	        	fontSize: 14,
	        	fontFamily: 'System',
	        	fontWeight: '600',
	        	color: '#8E8E93',
	        }}>WELCOME</Text>
	        <Text style={{
	        	fontSize: 34,
	        	fontFamily: 'System',
	        	fontWeight: 'bold'
        	}}>Christian</Text>
        </View>
      </SafeAreaView>
    );
  }
} 