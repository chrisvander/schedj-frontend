import React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  View,
} from 'react-native';
import { EventRegister } from 'react-native-event-listeners';
import * as Animatable from 'react-native-animatable';
import { Appearance } from 'react-native-appearance';
import { FN } from '../styles';
import {
  LargeNavBar, RoundedCard, UpNext, UpNextOverlay,
} from '../components';
import globals from '../globals';

const warningAsset = require('../assets/icons/warning.png');

let styles;

const stylesFunc = dark => StyleSheet.create({
  regSuperTitle: {
    fontFamily: 'Helvetica Neue',
    fontWeight: '500',
    fontSize: FN(18),
    color: '#677791',
  },
  regTitle: {
    fontFamily: 'Helvetica Neue',
    color: 'black',
    fontWeight: 'bold',
    fontSize: FN(21),
    marginBottom: 5,
  },
  regTitleContainer: {
    flexDirection: 'column',
    alignSelf: 'center',
  },
  regButtonImg: {
    width: 10,
    height: 15,
  },
  holdsCard: {
    backgroundColor: dark ? '#880000' : '#FF9191',
    padding: FN(10),
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 17,
  },
  holdsTitle: {
    fontFamily: 'Helvetica Neue',
    color: dark ? 'white' : 'black',
    fontWeight: 'bold',
    fontSize: FN(23),
    lineHeight: FN(50),
    marginLeft: FN(10),
  },
  holdsContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
  alertImg: {
    width: FN(50),
    height: FN(50),
  },
  importantBg: {
    backgroundColor: dark ? '#171717' : '#DEDEDE',
    padding: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  importantText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#5C5C5C',
    paddingBottom: 10,
  },
});

const openHoldsAsync = () => {
  fetch(globals.ROUTES.token)
    .then(res => res.json())
    .then(async (res) => {
      try {
        await WebBrowser.openBrowserAsync(`${globals.ROUTES.fetch}rss/bwskoacc.P_ViewHold&token=${res.SESSID}`);
      } catch (err) {
        throw new Error(err);
      }
    });
};

const HoldsCard = ({ holds }) => {
  if (holds) {
    return (
      <Animatable.View animation="fadeIn">
        <RoundedCard onPress={openHoldsAsync} style={[styles.holdsCard]} caret>
          <View style={[styles.holdsContainer]}>
            <Image
              style={[styles.alertImg]}
              source={warningAsset}
              resizeMode="cover"
            />
            <Text style={[styles.holdsTitle]}>You have a hold</Text>
          </View>
        </RoundedCard>
      </Animatable.View>
    );
  }
  return null;
};

const RegistrationCard = ({ state, navigation }) => {
  if (state.reg) {
    return (
      <Animatable.View animation="fadeIn">
        <RoundedCard onPress={() => { navigation.navigate('Schedule'); }} style={{ backgroundColor: '#CCEAFF' }} caret>
          <View style={[styles.regTitleContainer]}>
            <Text style={[styles.regSuperTitle]}>
              Course registration
              {' '}
              {globals.REGISTRATION.start_passed ? 'ends' : 'starts'}
              {' '}
              on:
            </Text>
            <Text style={[styles.regTitle]}>
              { globals.REGISTRATION.start_passed
                ? `${globals.REGISTRATION.end_date} at ${globals.REGISTRATION.end_time}`
                : `${globals.REGISTRATION.start_date} at ${globals.REGISTRATION.start_time}`
              }
            </Text>
          </View>
        </RoundedCard>
      </Animatable.View>
    );
  }
  return null;
};

export default class FeedScreen extends React.Component {
  static navigationOptions = { header: null }

  constructor(props) {
    super(props);
    this.state = {
      overlayVisible: false,
    };
  }

  componentWillMount() {
    this.setState({ dark: Appearance.getColorScheme() === 'dark' });
    styles = stylesFunc(Appearance.getColorScheme() === 'dark');
    this.appearance = Appearance.addChangeListener(({ colorScheme }) => {
      this.setState({ dark: colorScheme === 'dark' });
      styles = stylesFunc(colorScheme === 'dark');
    });
    try {
      this.setState({
        holds: false,
        reg: globals.REGISTRATION.start_date && !globals.REGISTRATION.end_passed,
      });
      if (globals.HOLDS) this.setState({ holds: globals.HOLDS });
      else EventRegister.addEventListener('load_holds', () => this.setState({ holds: globals.HOLDS }));
    } catch (err) {
      EventRegister.emit('begin_logout');
    }
  }

  componentWillUnmount() {
    EventRegister.removeEventListener('load_holds');
    this.appearance.remove();
  }

  render() {
    const { navigation } = this.props;
    const { holds, reg, overlayVisible, dark } = this.state;
    return (
      <React.Fragment>
        <LargeNavBar navigation={navigation} shadow title={globals.NAME[0]} preTitle="WELCOME" />
        <ScrollView style={{ backgroundColor: dark ? 'black' : 'white' }}>
          <SafeAreaView style={{ backgroundColor: dark ? 'black' : 'white' }}>
            <Animatable.View animation="fadeIn">
              { (holds || reg)
                && (
                <View style={[styles.importantBg]}>
                  <Text style={[styles.importantText]}>IMPORTANT</Text>
                  <HoldsCard holds={holds} />
                  <RegistrationCard state={this.state} navigation={navigation} />
                </View>
                )
              }
            </Animatable.View>
            <Animatable.View style={{ margin: 16, marginTop: 20, backgroundColor: dark ? 'black' : 'white' }} animation="fadeIn">
              { globals.SCHEDULE.end !== '' && <UpNext />}
              <RoundedCard onPress={() => { navigation.navigate('Manage'); }} color="blue" caret title="Manage Courses" />
              <RoundedCard onPress={() => { navigation.navigate('Search'); }} color="blue" caret title="Course Search" />
            </Animatable.View>
          </SafeAreaView>
        </ScrollView>
        <UpNextOverlay expanded={overlayVisible} />
      </React.Fragment>
    );
  }
}
