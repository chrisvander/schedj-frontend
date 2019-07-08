import React from 'react';
import {
  Text, View, Image, TouchableOpacity, StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';

const gearIcon = require('../assets/icons/gear.png');

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
});

export default class LargeNavBar extends React.Component {
settings = () => {
  const { navigation } = this.props;
  navigation.navigate('Settings');
}

render() {
  const {
    shadow, fixed, gearHidden, preTitle, title,
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
          <View style={[styles.largeNavBarView]}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={[styles.subTitle]}>{preTitle}</Text>
              <Text style={[styles.bigTitle]}>{title}</Text>
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
