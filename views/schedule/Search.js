import React from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import { Appearance } from 'react-native-appearance';
import { LargeNavBar } from '../../components';
import globals from '../../globals';
import { FN } from '../../styles';

const { yacs } = globals.ROUTES;
const searchIcon = require('../../assets/icons/search.png');
const downArrowIcon = require('../../assets/icons/downArrow.png');

const styles = StyleSheet.create({
  searchBar: {
    color: '#2699FB',
    textAlign: 'left',
    fontSize: 30,
    flex: 1,
  },
  dropBtnText: {
    fontSize: FN(20),
    color: '#2699FB',
  },
  dropdown: {

  },
  dropdownText: {
    fontSize: FN(18),
  },
});

export default class GradesScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'COURSE SEARCH',
  }

  state = {
    // Assing a array to your pokeList state
    departmentList: [],
    // Have a loading state where when data retrieve returns data.
    loading: true,
  }

  componentDidMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
    try {
      // Assign the promise unresolved first then get the data using the json method.
      fetch(yacs.terms)
        .then(res => res.json())
        .then((reqBody) => {
          const termsObj = reqBody.data;
          const selectedTerm = termsObj[0];
          this.setState({ terms: termsObj, selectedTerm, loading: false });
        });
    } catch (err) {
      throw new Error(err);
    }
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  setTerm = (term) => {
    this.setState({ selectedTerm: term });
  }

  searchBar = () => {
    const { dark } = this.state;
    return (
      <View
        style={{
          position: 'absolute',
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          paddingBottom: 10,
          width: '100%',
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Image
            defaultSource={searchIcon}
            source={searchIcon}
            style={{ width: 20, height: 20, marginRight: 20 }}
          />
          <TextInput
            placeholderTextColor={dark ? '#5c6e7d' : '#BCE0FD'}
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

  picker = () => {
    const { terms, loading, dark } = this.state;
    if (loading) return null;
    const opts = terms.map(v => v.attributes.longname);
    return (
      <TouchableOpacity
        onPress={() => this.dropdown.show()}
      >
        <View style={{ flexDirection: 'row' }}>
          <ModalDropdown
            ref={(dropdown) => { this.dropdown = dropdown; }}
            defaultIndex={0}
            defaultValue={opts[0]}
            options={opts}
            textStyle={[styles.dropBtnText]}
            dropdownStyle={[styles.dropdown]}
            dropdownTextStyle={[styles.dropdownText]}
            onSelect={index => this.setTerm(terms[index])}
          />
          <Image
            source={downArrowIcon}
            style={{
              width: 14,
              height: 9,
              marginLeft: 6,
              marginTop: 7,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const { loading, dark } = this.state;
    return (
      <React.Fragment>
        <LargeNavBar gearHidden shadow backBtn rightBtn={this.picker()}>
          {this.searchBar()}
        </LargeNavBar>
        <View style={{ flex: 1, backgroundColor: dark ? 'black' : '' }}>
          {loading && (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text> Loading... </Text>
            </View>
          )}
        </View>
      </React.Fragment>
    );
  }
}
