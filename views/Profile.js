import React from 'react';
import { EventRegister } from 'react-native-event-listeners';
import {
  Text, ScrollView, StyleSheet,
} from 'react-native';
import { LargeNavBar, RoundedCard } from '../components';
import globals from '../globals';
import { FN } from '../styles';

const styles = StyleSheet.create({
  gradesCard: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
    padding: FN(20),
  },
});

export default class ProfileScreen extends React.Component {
  componentWillMount() {
    this.setState({ loaded: false, gpa: '' });
    if (globals.GRADES.loaded) this.setState({ gpa: globals.GRADES.gpa, loaded: true });
    else EventRegister.addEventListener('load_grades', (data) => {
      if (data) this.setState({ gpa: data.gpa, loaded: true });
      else globals.fetchGrades();
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('load_grades');
  }

  render() {
    const { loaded, gpa } = this.state;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <LargeNavBar shadow navigation={navigation} title="Profile" />
        <ScrollView style={{ padding: 16, paddingTop: 30, flexDirection: 'column' }}>
          <RoundedCard
            style={[styles.gradesCard]}
            color="blue"
            caret
            title="Grades"
            onPress={() => navigation.navigate('Grades')}
          >
            {loaded && (
            <Text style={{ fontSize: 18 }}>
              Overall GPA:
              {' '}
              {gpa}
            </Text>
            )}
          </RoundedCard>
        </ScrollView>
      </React.Fragment>
    );
  }
}
