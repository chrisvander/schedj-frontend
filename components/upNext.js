import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import * as Animatable from 'react-native-animatable';
import RoundedCard, { RoundedCardTitle } from './roundedCard';
import { FN } from '../styles';
import globals from '../globals';
import translateTitle from '../data/translate_course_title';

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    height: 400,
    width: '100%',
    backgroundColor: 'white',
    bottom: 0,
  },
  titleText: {
    fontSize: FN(26),
    fontWeight: 'bold',
    alignSelf: 'stretch',
  },
  classText: {
    fontSize: FN(18),
    fontFamily: 'Arial',
    color: '#575757',
    paddingTop: FN(10),
  },
  tagContainer: {
    flexDirection: 'row',
    marginTop: 11,
  },
  tag: {
    backgroundColor: '#EFEFEF',
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

export const Tag = ({ children }) => (
  <View style={[styles.tag]}>
    <Text style={[styles.tagText]}>{children}</Text>
  </View>
);

export default class UpNext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: '',
      tags: [],
      loading: true,
      visible: true,
    };
  }

  componentWillMount() {
    this.mounted = true;
    if (globals.SCHEDULE.loaded) this.loadInfo();
    else EventRegister.addEventListener('load_schedule', () => this.loadInfo());
  }

  componentWillUnmount() {
    this.mounted = false;
    EventRegister.removeEventListener('load_schedule');
  }

  loadInfo() {
    const p = globals.get_next_class_info();
    if (p) {
      p.then((resJson) => {
        if (this.mounted) {
          if (resJson) {
            this.setState({
              loading: false,
              className: resJson.name,
              tags: [resJson.cl.location, resJson.cl.start_time],
            });
          } else this.setState({ visible: false });
        }
      });
    } else this.setState({ visible: false });
  }

  render() {
    const {
      visible, className, loading, tags,
    } = this.state;
    if (visible && className) {
      return (
        <Animatable.View animation="zoomIn">
          <RoundedCard style={loading ? { flexDirection: 'row', justifyContent: 'center' } : {}}>
            <React.Fragment>
              <RoundedCardTitle>Up Next</RoundedCardTitle>
              <Text style={[styles.classText]}>{className ? translateTitle(className) : ''}</Text>
              <View style={[styles.tagContainer]}>
                {tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
              </View>
            </React.Fragment>
          </RoundedCard>
        </Animatable.View>
      );
    }
    return (
      <Animatable.View animation="zoomIn">
        <RoundedCard>
          <RoundedCardTitle>Up Next</RoundedCardTitle>
          <Text style={[styles.classText]}>You're done with classes today.</Text>
        </RoundedCard>
      </Animatable.View>
    );
  }
}

export const UpNextOverlay = () => (
  <View style={[styles.overlay]}>
    <TouchableOpacity>
      <Text> Press </Text>
    </TouchableOpacity>
  </View>
);

export const ClassCard = () => (
  <View>
    <Text>hi</Text>
  </View>
);
