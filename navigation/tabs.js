/*  eslint global-require: "off"  */
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { StyleSheet, Image } from 'react-native';
import { Feed, Schedule, Profile } from '../views';
import { Grades } from '../views/profile/index';
import { Manage, Search } from '../views/schedule/index';

const s = StyleSheet.create({
  tabIcon: {
    width: 21,
    height: 21,
  },
});

const navOptions = {
  defaultNavigationOptions: {
    headerTintColor: '#2699FB',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
      fontSize: 14,
    },
  },
};

const ProfileStack = createStackNavigator({
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
}, navOptions);

const FeedStack = createStackNavigator({
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
}, navOptions);

const TabNavigator = createBottomTabNavigator(
  {
    Feed: FeedStack,
    Schedule,
    Profile: ProfileStack,
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
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#68B8FC',
      showLabel: false,
      style: {
        backgroundColor: '#2699FB',
      },
    },
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: 'Feed',
  },
);

export default TabNavigator;
