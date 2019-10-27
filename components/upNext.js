import React from 'react';
import {
  StyleSheet, Text, View, ScrollView,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import * as Animatable from 'react-native-animatable';
import { Appearance } from 'react-native-appearance';
import RoundedCard, { RoundedCardTitle } from './roundedCard';
import Drawer from './drawer';
import { FN } from '../styles';
import globals from '../globals';
import translateTitle from '../data/translate_course_title';

const styles = dark => StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: 400,
    width: '100%',
    backgroundColor: dark ? 'black' : 'white',
    bottom: 0,
  },
  titleText: {
    fontSize: FN(26),
    fontWeight: 'bold',
    alignSelf: 'stretch',
    color: dark ? 'white' : 'black',
  },
  classText: {
    fontSize: FN(18),
    fontFamily: 'Arial',
    color: dark ? '#777777' : '#575757',
    paddingTop: FN(10),
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 11,
  },
  tag: {
    backgroundColor: dark ? '#343434' : '#EFEFEF',
    padding: FN(8),
    borderRadius: 10,
    marginRight: FN(8),
  },
  tagText: {
    color: '#6F9AAA',
    fontSize: FN(18),
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
});

export class Tag extends React.Component {
  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  render() {
    const { children } = this.props;
    const { dark } = this.state;
    return (
      <View style={[styles(dark).tag]}>
        <Text style={[styles(dark).tagText]}>{children}</Text>
      </View>
    );
  }
}

export default class UpNext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      tags: [],
      loading: true,
    };
  }

  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
    if (globals.SCHEDULE.loaded) this.loadInfo();
    else EventRegister.addEventListener('load_schedule', () => this.loadInfo());
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('load_schedule');
    this.appearance.remove();
  }

  loadInfo() {
    if (globals.SCHEDULE.next) {
      const { className, tags } = globals.SCHEDULE.next;
      this.setState({
        loading: false,
        className,
        tags,
      });
    } else this.setState({ loading: false });
  }

  render() {
    const {
      className, loading, tags, dark,
    } = this.state;
    if (className) {
      return (
        <RoundedCard onPress={() => EventRegister.emit('toggle_overlay')} style={loading ? { flexDirection: 'row', justifyContent: 'center' } : {}}>
          <React.Fragment>
            <RoundedCardTitle style={{ color: dark ? 'white' : 'black' }}>Up Next</RoundedCardTitle>
            <Text style={[styles(dark).classText]}>{className ? translateTitle(className) : ''}</Text>
            <View style={[styles(dark).tagContainer]}>
              {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
            </View>
          </React.Fragment>
        </RoundedCard>
      );
    }
    return !loading ? (
      <RoundedCard>
        <RoundedCardTitle style={{ color: dark ? 'white' : 'black' }}>Up Next</RoundedCardTitle>
        <Text style={[styles(dark).classText]}>You're done with classes today.</Text>
      </RoundedCard>
    ) : (
      <Animatable.View animation="fadeIn">
        <RoundedCard>
          <RoundedCardTitle>Up Next</RoundedCardTitle>
          <Text style={[styles(dark).classText]}>Loading...</Text>
        </RoundedCard>
      </Animatable.View>
    );
  }
}

export const ClassCard = ({ clinfo, dark }) => (
  <RoundedCard style={{ flexDirection: 'row', justifyContent: 'left' }}>
    <React.Fragment>
      <Text style={[styles(dark).classText, { fontWeight: 'bold', paddingTop: 0 }]}>{translateTitle(clinfo.name)}</Text>
      <View style={[styles(dark).tagContainer]}>
        <Tag>{clinfo.location}</Tag>
        <Tag>{clinfo.start_time}</Tag>
      </View>
    </React.Fragment>
  </RoundedCard>
);

export class UpNextOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentWillMount() {
    if (globals.SCHEDULE.loaded) this.setState({ loaded: true });
    else EventRegister.addEventListener('load_schedule', () => this.setState({ loaded: true }));
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
    });
  }

  componentWillUnmount() {
    this.appearance.remove();
  }

  render() {
    const { loaded, dark } = this.state;
    if (loaded) {
      return (
        <Drawer offset="100%" event="toggle_overlay" expandedOffset={FN(150)}>
          <ScrollView
            style={{
              height: '100%',
              width: '100%',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <RoundedCardTitle style={{ fontSize: FN(36), marginBottom: 16 }}>Today</RoundedCardTitle>
            {globals.SCHEDULE.today.map(item => <ClassCard key={item.CRN} clinfo={item} dark={dark} />)}
          </ScrollView>
        </Drawer>
      );
    }
    return null;
  }
}
