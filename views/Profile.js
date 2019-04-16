import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { Text, View, Button, ScrollView, StyleSheet } from 'react-native';
import { LargeNavBar, RoundedCard, RoundedCardTitle } from '../components';
import globals from '../globals.js';
import { FN } from '../styles';

const styles = StyleSheet.create({
  gradesCard: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    padding: FN(20)
  },
});

export default class ProfileScreen extends React.Component {
  componentWillMount() {
    this.setState({ loaded: false, gpa: '' });
    if (globals.GRADES.loaded) this.setState({ gpa: globals.GRADES.gpa, loaded: true });
    else EventRegister.addEventListener('load_grades', (data) => this.setState({ gpa: data.gpa, loaded: true }));
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('load_grades');
  }
  render() {
    return (
    	<React.Fragment>
    		<LargeNavBar navigation={this.props.navigation} title="Profile" />
	      <ScrollView style={{padding: 16, paddingTop: 30, flexDirection: 'column'}}>
          <RoundedCard 
            style={[styles.gradesCard]} 
            color={'blue'} 
            caret={true} 
            title={'Grades'} 
            onPress={()=>this.props.navigation.navigate('Grades')}
          >
            {this.state.loaded && <Text style={{fontSize: 18}}>
              Overall GPA: {this.state.gpa}
            </Text>}
          </RoundedCard>
	      </ScrollView>
	     </React.Fragment>
    );
  }
}