/*  eslint global-require: "off"  */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { Feed, Schedule, Profile } from '../views';
import { Grades } from '../views/profile/index';
import { Manage, Search } from '../views/schedule/index';
import { Appearance } from 'react-native-appearance';

const s = StyleSheet.create({
  tabIcon: {
    width: 21,
    height: 21,
  },
});

const navOptions = dark => ({
  defaultNavigationOptions: {
    headerTintColor: dark ? 'white' : '#2699FB',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
      fontSize: 14,
    },
    headerStyle: {
      backgroundColor: dark ? 'black' : 'white',
      borderBottomColor: '#373737',
    },
  },
});

const ProfileStack = dark => createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Grades: {
    screen: Grades,
  },
}, navOptions(dark));

const FeedStack = dark => createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: {
      header: null,
      gesturesEnabled: false,
    },
  },
  Manage: {
    screen: Manage,
  },
  Search: {
    screen: Search,
    navigationOptions: {
      header: null,
    },
  },
}, navOptions(dark));

const TabNavigator = dark => createBottomTabNavigator(
  {
    Feed: FeedStack(dark),
    Schedule,
    Profile: ProfileStack(dark),
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Feed') {
          return focused
            ? <Image style={s.tabIcon} source={require('../assets/tabbar/feed_on-3x.png')} />
            : <Image style={s.tabIcon} source={require('../assets/tabbar/feed-3x.png')} />;
        }
        if (routeName === 'Schedule') {
          return focused
            ? <Image style={s.tabIcon} source={require('../assets/tabbar/calendar_on-3x.png')} />
            : <Image style={s.tabIcon} source={require('../assets/tabbar/calendar-3x.png')} />;
        }
        return focused
          ? <Image style={s.tabIcon} source={require('../assets/tabbar/profile_on-3x.png')} />
          : <Image style={s.tabIcon} source={require('../assets/tabbar/profile-3x.png')} />;
      },
    }),
    tabBarOptions: {
      tabBarPosition: 'bottom',
      activeTintColor: dark ? '#68B8FC' : '#FFFFFF',
      inactiveTintColor: dark ? '#555555' : '#68B8FC',
      showLabel: false,
      style: {
        backgroundColor: dark ? '#171717' : '#2699FB',
      },
    },
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: 'Feed',
  },
);

export default TabNavigator;
