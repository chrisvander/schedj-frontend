import React from 'react';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { LargeNavBar, RoundedCard, RoundedCardTitle } from '../components';
import { FN } from '../styles';

const styles = StyleSheet.create({
  gradesCard: {
    padding: FN(10),
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17
  },
});

export default class ProfileScreen extends React.Component {
  render() {
    return (
    	<React.Fragment>
    		<LargeNavBar navigation={this.props.navigation} title="Profile" />
	      <ScrollView style={{padding: 16, paddingTop: 30}}>
          <RoundedCard 
            style={[styles.gradesCard]} 
            color={'blue'} 
            caret={true} 
            title={'Grades'} 
            onPress={()=>this.props.navigation.navigate('Grades')}
          />
	      </ScrollView>
	     </React.Fragment>
    );
  }
}