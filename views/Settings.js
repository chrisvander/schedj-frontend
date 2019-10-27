import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  BasicTableView,
} from '../components';
import { Appearance } from 'react-native-appearance';
import { logout } from '../auth';
import globals from '../globals';

const stylesFunc = dark => StyleSheet.create({
  header: {
    width: '100%',
    height: 106,
    backgroundColor: dark ? '#171717' : '#F1F9FF',
    padding: 32,
    marginBottom: 30,
  },
  name: {
    fontFamily: 'Arial',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2699FB',
  },
  location: {
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#2699FB',
    marginTop: 3,
  },
});

const settingsBundle = [
  {
    title: 'Notifications',
    icon: 'notification',
  },
  {
    title: 'General',
    icon: 'gear',
  },
  {
    title: 'Account',
    icon: 'profile',
  },
  {
    title: 'Logout',
    icon: 'logout',
    onPress: () => logout(),
  },
];

export default class SettingsScreen extends React.Component {
  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  static navigationOptions = {
    title: 'SETTINGS',
  }

  render() {
    const { dark } = this.state;
    const styles = stylesFunc(dark);
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: dark ? 'black' : 'white' }}>
        <View style={[styles.header]}>
          <Text style={[styles.name]}>{globals.NAME.join(' ')}</Text>
          <Text style={[styles.location]}>{globals.ADDRESS.city}</Text>
        </View>
        <BasicTableView data={settingsBundle} />
      </View>
    );
  }
}
