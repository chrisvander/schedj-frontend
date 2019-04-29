import React from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { NavStyle, FN } from '../styles';

const gearIcon = require('../assets/icons/gear.png');

export default class LargeNavBar extends React.Component {
settings = () => {
  const { navigation } = this.props;
  navigation.navigate('Settings');
}

render() {
  const {
    shadowProp, fixed, gearHidden, preTitle, title,
  } = this.props;
  let shadow = { shadowOpacity: 0.16, shadowRadius: 10 };
  if (!shadowProp) shadow = { shadowOpacity: 0.0 };
  return (
    <React.Fragment>
      <View style={[
        shadow,
        fixed
          ? {
            position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1,
          }
          : {},
        { backgroundColor: '#FFFFFF' }]}
      >
        <SafeAreaView>
          <View style={[NavStyle.largeNavBarView]}>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={[NavStyle.subTitle]}>{preTitle}</Text>
              <Text style={[NavStyle.bigTitle]}>{title}</Text>
            </View>
            {!gearHidden && (
            <View style={[NavStyle.gearContainer]}>
              <TouchableOpacity onPress={this.settings}>
                <Image
                  style={[NavStyle.gear]}
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
      {fixed && <SafeAreaView style={{ height: FN(120) }} />}
    </React.Fragment>
  );
}
}
