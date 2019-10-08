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

  async componentDidMount() {
    try {
      // Assign the promise unresolved first then get the data using the json method.
      const termsApiRequest = await fetch(yacs.terms);
      const termsObj = (await termsApiRequest.json()).data;
      const selectedTerm = termsObj[0];
      this.setState({ terms: termsObj, selectedTerm, loading: false });
    } catch (err) {
      console.error('Error fetching data-----------', err);
    }
  }

  setTerm = (term) => {
    this.setState({ selectedTerm: term });
  }

  searchBar = () => (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingBottom: 10,
      }}
    >
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
  )

  picker = () => {
    const { terms, loading } = this.state;
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
    const { loading } = this.state;
    return (
      <React.Fragment>
        <LargeNavBar gearHidden shadow backBtn rightBtn={this.picker()}>
          {this.searchBar()}
        </LargeNavBar>

        {loading && (
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text> Loading... </Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}
