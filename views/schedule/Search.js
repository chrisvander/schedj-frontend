import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
} from 'react-native';
import { LargeNavBar } from '../../components';

const searchIcon = require('../../assets/icons/search.png');

const styles = StyleSheet.create({
  searchBar: {
    color: '#2699FB',
    textAlign: 'left',
    fontSize: 30,
  },
});

export default class GradesScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'COURSE SEARCH',
  }

  async componentDidMount() {

  }

  searchBar = () => {
    return (
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 10,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Image
            defaultSource={searchIcon}
            source={searchIcon}
            style={{ width: 20, height: 20, marginRight: 20 }}
          />
          <TextInput
            placeholderTextColor="#BCE0FD"
            placeholder="Search"
            autoCorrect={false}
            returnKeyType="search"
            style={[styles.searchBar]}
            ref={(input) => { this.passwordField = input; }}
            onSubmitEditing={() => {}}
            onChangeText={searchTerm => this.setState({ searchTerm })}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <React.Fragment>
        <LargeNavBar gearHidden shadow backBtn>
          {this.searchBar()}
        </LargeNavBar>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text> Loading... </Text>
        </View>
      </React.Fragment>
    );
  }
}
