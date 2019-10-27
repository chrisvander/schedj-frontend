import React from 'react';
import {
  Text, View, ActivityIndicator, ScrollView,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import DropdownAlert from 'react-native-dropdownalert';
import Accordion from 'react-native-collapsible/Accordion';
import { Appearance } from 'react-native-appearance';
import {
  Tag, RoundedCardTitle,
} from '../../components';
import { logout } from '../../auth';
import { FN } from '../../styles';
import globals from '../../globals.js';
import translate_term from '../../data/translate_term';
import translate_course from '../../data/translate_course_title';


function gradeColor(attempted, points) {
  if (attempted == 0) return '#2699FB';
  const ratio = points / (attempted * 4);
  const curve = (ratio, scale) => scale * ((Math.pow((ratio * 2) - 1, 3) + 1) / 2);
  return `hsl(${curve(ratio, 100)},80%,50%)`;
}

export default class GradesScreen extends React.Component {
  static navigationOptions = {
    title: 'GRADES',
  }

  componentWillMount() {
    this.setState({
      loaded: false, failed: false, gpa: '', activeSections: [0], grades: [],
    });
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
    if (globals.GRADES.loaded) this.loadInfo(globals.GRADES);
    else EventRegister.addEventListener('load_grades', data => this.loadInfo(data));
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  renderHeader = (section, index, isActive) => (
    <View style={{
      backgroundColor: this.state.dark ? '#171717' : '#EFEFEF',
      padding: 15,
      borderBottomColor: this.state.dark ? '#373737' : '#D0D0D0',
      borderBottomWidth: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    }}
    >
      <Text style={{
        color: '#707070',
        flexDirection: 'column',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: FN(16),
      }}
      >
        {section.term}
      </Text>
      <Text style={{ color: '#707070', fontSize: FN(20) }}>{isActive ? '-' : '+'}</Text>
    </View>
  );

  renderContent = (section) => {
    let total = 0;
    let earned = 0;
    for (const i in section.content) {
      total += parseFloat(section.content[i].GPA_HRS);
      earned += parseFloat(section.content[i].POINTS);
    }
    const gpa = Number((earned / total).toFixed(2));
    return (
      <View style={{
        backgroundColor: this.state.dark ? '#171000' : '#F4FAFF',
        padding: FN(20),
      }}
      >
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Text style={{
            color: '#6F9AAA',
            fontFamily: 'Arial',
            fontSize: FN(18),
            fontWeight: 'bold',
          }}
          >
CLASSES:
          </Text>
          <Tag>
            {gpa}
            {' '}
GPA
          </Tag>
        </View>
        {section.content.map(data => (
          <View
            key={data.CRN}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10,
              alignItems: 'center',
            }}
          >
            <View style={{ width: '80%' }}>
              <Text numberOfLines={1} style={{ fontSize: FN(17), color: this.state.dark ? 'white' : '#717171', fontWeight: 'bold', width: '100%' }}>{translate_course(data.TITLE)}</Text>
              <Text style={{ fontSize: FN(14), color: this.state.dark ? '#DADADA' : '#717171', paddingTop: 2 }}>{`${data.SUBJ} ${data.COURSE}`}</Text>
              <Text style={{
                fontSize: FN(16), fontWeight: 'bold', color: this.state.dark ? '#DADADA' : '#717171', paddingTop: 2,
              }}
              >
                {`${Math.floor(data.ATTEMPTED)} credits`}
              </Text>
            </View>
            <View style={{
              backgroundColor: gradeColor(data.GPA_HRS, data.POINTS),
              width: FN(50),
              height: FN(50),
              borderRadius: FN(10),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            >
              <Text style={{ color: 'white', fontSize: FN(20), fontWeight: 'bold' }}>{data.GRADE}</Text>
            </View>
          </View>
        ))}
      </View>
    );
  };

  updateSections = (activeSections) => {
    this.setState({ activeSections });
  };

  loadInfo(data) {
    if (Object.keys(data).length > 1) {
      const grades = [];
      for (entry in data) if (entry != 'loaded' && entry != 'gpa') grades.push({ term: translate_term(entry), content: data[entry] });
      grades.sort().reverse();
      this.setState({ grades, gpa: data.gpa });
    } else this.setState({ failed: true });
    this.setState({ loaded: true });
  }

  render() {
    const {
      loaded, failed, gpa, grades, activeSections, dark,
    } = this.state;
    return (
      <React.Fragment>
        {failed && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark ? 'black' : 'white' }}>
            <Text style={{ color: dark ? 'white' : 'black' }}>Failed to load your grades.</Text>
          </View>
        )}
        {!loaded && !failed && (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: dark ? 'black' : 'white' }}>
            <ActivityIndicator />
          </View>
        )}
        {loaded && !failed
          && (
          <ScrollView style={{ backgroundColor: dark ? 'black' : 'white' }}>
            <View style={{
              padding: FN(15),
              paddingTop: FN(20),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            >
              <RoundedCardTitle style={{ color: dark ? 'white' : 'black' }}>Overall</RoundedCardTitle>
              <Tag>
                {Number.parseFloat(gpa).toFixed(2)}
                {' '}
GPA
              </Tag>
            </View>
            <Accordion
              sections={grades}
              activeSections={activeSections}
              renderHeader={this.renderHeader}
              renderContent={this.renderContent}
              onChange={this.updateSections}
            />
          </ScrollView>
          )}
        <DropdownAlert ref={(ref) => { this.dropdown = ref; }} inactiveStatusBarStyle="default" />
      </React.Fragment>
    );
  }
}
