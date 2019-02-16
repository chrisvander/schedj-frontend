import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LargeNavBar, TableView, SButton } from '../components';
import { logout } from '../auth';
import globals from '../globals.js';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 106,
    backgroundColor: '#F1F9FF',
    padding: 32
  },
  name: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2699FB'
  },
  location: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#2699FB',
    marginTop: 3
  }
})

export default class SettingsScreen extends React.Component {
	static navigationOptions = { 
    title: "SETTINGS",
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <View style={[styles.header]}>
          <Text style={[styles.name]}>{globals.NAME.join(' ')}</Text>
          <Text style={[styles.location]}>San Fran</Text>
        </View>
        <SButton onPress={()=>logout()} >Logout</SButton>
      </View>
    );
  }
}