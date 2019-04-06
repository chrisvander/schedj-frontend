import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { LargeNavBar, BasicTableView, Tag, RoundedCard, RoundedCardTitle } from '../../components';
import { logout } from '../../auth';
import { EventRegister } from 'react-native-event-listeners';
import { FN } from '../../styles';
import globals from '../../globals.js';
import DropdownAlert from 'react-native-dropdownalert';
import Accordion from 'react-native-collapsible/Accordion';
import translate_term from '../../data/translate_term';
import translate_course from '../../data/translate_course_title';

export default class GradesScreen extends React.Component {
	static navigationOptions = { 
    title: "GRADES",
  }

  loadInfo(data) {
    if (data) {
      var grades = [];
      for (entry in data) {
        if (entry != 'loaded') {
          grades.push({ term: translate_term(entry), content: data[entry] });
        }
      }
      grades.sort().reverse();
      this.setState({ grades: grades });
    }
    else this.setState({ failed: true });
    this.setState({ loaded: true });
  }

  calculateGPA(data) {
    if (data) {
      var total=0;
      var earned=0;
      for (var i in data) for (var j in data[i].content) {
        total+=parseFloat(data[i].content[j].GPA_HRS);
        earned+=parseFloat(data[i].content[j].POINTS);
      }
      return Number((earned/total).toFixed(2));    
    }
    return '';
  }

  componentWillMount() {
    this.setState({ loaded: false, failed: false, activeSections: [0], grades: [] });
    if (globals.GRADES.loaded) this.loadInfo(globals.GRADES);
    else EventRegister.addEventListener('load_grades', (data) => this.loadInfo(data));
  }

  componentDidMount() {
    if (this.state.failed) 
      this.dropdown.alertWithType('error', "Failed to load", "Looks like we're having trouble pulling up your grades.");
  }

  _renderHeader = (section, index, isActive) => {
    return (
      <View style={{
        backgroundColor: '#EFEFEF', 
        padding: 15, 
        borderBottomColor: '#D0D0D0', 
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Text style={{
          color: '#707070', 
          flexDirection: 'column', 
          alignSelf: 'center', 
          fontWeight: 'bold', 
          fontSize: FN(16), 
        }}>{section.term}</Text>
        <Text style={{color: '#707070', fontSize: FN(20)}}>{isActive ? '-' : '+'}</Text>
      </View>
    );
  };

  _renderContent = section => {
    var total=0;
    var earned=0;
    for (var i in section.content) {
      total+=parseFloat(section.content[i].GPA_HRS);
      earned+=parseFloat(section.content[i].POINTS);
    }
    var gpa = Number((earned/total).toFixed(2));
    return (
      <View style={{ 
        backgroundColor: '#F4FAFF', 
        padding: FN(20) 
      }}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <Text style={{
            color: '#6F9AAA',
            fontFamily: 'Arial',
            fontSize: FN(18),
            fontWeight: 'bold',
          }}>CLASSES:</Text>
          <Tag>{gpa} GPA</Tag>
        </View>
          {section.content.map(data => (
            <View key={data.CRN} style={{
              flexDirection:'row',
              justifyContent: 'space-between',
              paddingTop:10,
              alignItems: 'center'
            }}>
              <View>
                <Text style={{fontSize: FN(18),fontWeight: 'bold'}}>{translate_course(data.TITLE)}</Text>
                <Text style={{fontSize: FN(14),color:'#717171',paddingTop:2}}>{data.SUBJ + ' ' + data.COURSE}</Text>
                <Text style={{fontSize: FN(16),color:'#717171',fontWeight: 'bold',paddingTop:2}}>
                  {Math.floor(data.ATTEMPTED) + ' credits'}
                </Text>
              </View>
              <View style={{
                backgroundColor: '#2699FB', 
                width: FN(50),
                height: FN(50),
                borderRadius: FN(10),
                justifyContent: 'center', 
                alignItems: 'center' 
              }}>
                <Text style={{color: 'white', fontSize: FN(20),fontWeight: 'bold'}}>{data.GRADE}</Text>
              </View>
            </View>
          ))}
      </View>
    );
  };

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.loaded && <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator />
        </View>}
        <ScrollView>
          <View style={{
            padding:FN(15), 
            paddingTop: FN(25), 
            flexDirection:'row', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <RoundedCardTitle>Overall</RoundedCardTitle>
            <Tag>{this.calculateGPA(this.state.grades)} GPA</Tag>
          </View>
          <Accordion
            sections={this.state.grades}
            activeSections={this.state.activeSections}
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            onChange={this._updateSections}
          />
        </ScrollView>
        <DropdownAlert ref={ref => this.dropdown = ref} inactiveStatusBarStyle={'default'} />
      </React.Fragment>
    );
  }
}