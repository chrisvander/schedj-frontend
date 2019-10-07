import React from 'react';
import {
  Text, View, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView, withNavigation } from 'react-navigation';

const gearIcon = require('../assets/icons/gear.png');
const backIcon = require('../assets/icons/backBtn.png');

const styles = StyleSheet.create({
  subTitle: {
    fontSize: 14,
    fontFamily: 'System',
    fontWeight: '600',
    color: '#8E8E93',
  },
  bigTitle: {
    fontSize: 34,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  largeNavBarView: {
    height: 100,
    paddingLeft: 16,
    paddingBottom: 6,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  gearContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-end',
    paddingBottom: 6,
    paddingRight: 16,
  },
  gear: {
    width: 36,
    height: 36,
  },
  back: {
    width: 20,
    height: 20,
  },
});

// PROPS
// ----------------------
// all bools default to false
// shadow (BOOL) sets shadow
// fixed (BOOL) keeps navbar at top of page
// gearHidden (BOOL) hides settings gear
// backBtn (BOOL) shows back button (requires navigation obj)
// preTitle (STRING) pre title
// title (STRING) title of bar
// children (JSX) replaces title/pretitle contents

class LargeNavBar extends React.Component {
  settings = () => {
    const { navigation } = this.props;
    navigation.navigate('Settings');
  }

  back = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const {
      shadow, fixed, gearHidden, preTitle, title, children, backBtn, rightBtn,
    } = this.props;
    let shadowInfo = { shadowOpacity: 0.16, shadowRadius: 10 };
    if (!shadow) shadowInfo = { shadowOpacity: 0.0 };
    return (
      <React.Fragment>
        <View style={[
          shadowInfo,
          fixed
            ? {
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1,
            }
            : {},
          { backgroundColor: '#FFFFFF' }]}
        >
          <SafeAreaView>
            {backBtn && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 6,
                  marginLeft: 16,
                  marginRight: 16,
                }}
              >
                <TouchableOpacity onPress={this.back}>
                  <Image
                    style={[styles.back]}
                    source={backIcon}
                    defaultSource={backIcon}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
                {rightBtn}
              </View>
            )}
            <View style={[styles.largeNavBarView]}>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                {!children && (
                  <React.Fragment>
                    <Text style={[styles.subTitle]}>{preTitle}</Text>
                    <Text style={[styles.bigTitle]}>{title}</Text>
                  </React.Fragment>
                )}
                {children}
              </View>
              {!gearHidden && (
              <View style={[styles.gearContainer]}>
                <TouchableOpacity onPress={this.settings}>
                  <Image
                    style={[styles.gear]}
                    source={gearIcon}
                    defaultSource={gearIcon}
                    resizeMode="cover"
                  />
                </TouchableOpacity>
              </View>
              )}
            </View>
          </SafeAreaView>
        </View>
        {fixed && <SafeAreaView style={{ height: 100 }} />}
      </React.Fragment>
    );
  }
}

export default withNavigation(LargeNavBar);
