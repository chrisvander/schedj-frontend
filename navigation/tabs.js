import React from 'react';
import { Feed, Schedule, Profile } from "../views";
import { Grades } from "../views/profile";
import { Manage } from "../views/schedule";
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import { StyleSheet, View, Image } from 'react-native';
import { IconComponent } from '../components';

const s = StyleSheet.create({
  tabIcon: {
    width: 21,
    height: 21
  }
});

const navOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#FFF',
      elevation: 0,
      shadowOpacity: 0.3,
      borderBottomColor:'transparent',
      borderBottomWidth: 0
    },
    headerTintColor: '#2699FB',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontFamily: 'Helvetica Neue',
      fontSize: 14
    }
  }
};

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
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
      gesturesEnabled: false
    }
  },
  Manage: {
    screen: Manage,
  }
}, navOptions);

const TabNavigator = createBottomTabNavigator(
  {
    Feed: FeedStack,
    Schedule: Schedule,
    Profile: ProfileStack
  },
  {
  	defaultNavigationOptions: ({ navigation }) => ({
  		tabBarIcon: ({ focused, horizontal, tintColor }) => {
  			const { routeName } = navigation.state;
        if (routeName === "Feed") 
          return focused ? 
            <Image style={s.tabIcon} source={require('../assets/tabbar/feed_on-3x.png')} /> :
            <Image style={s.tabIcon} source={require('../assets/tabbar/feed-3x.png')} />;
        else if (routeName === "Schedule") 
          return focused ?
            <Image style={s.tabIcon} source={require('../assets/tabbar/calendar_on-3x.png')} /> :
            <Image style={s.tabIcon} source={require('../assets/tabbar/calendar-3x.png')} />;
        else 
          return focused ?
            <Image style={s.tabIcon} source={require('../assets/tabbar/profile_on-3x.png')} /> :
            <Image style={s.tabIcon} source={require('../assets/tabbar/profile-3x.png')} />;
        
  		},
  	}),
    tabBarOptions: {
    	tabBarPosition: 'bottom',
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#68B8FC',
      showLabel: false,
      style: {
      	backgroundColor: '#2699FB'
      }
    },
    animationEnabled: true,
    swipeEnabled: true,
    initialRouteName: 'Feed'
  }
);

export default TabNavigator;

