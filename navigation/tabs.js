import React from 'react';
import { Feed, Schedule, Profile } from "../views";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { StyleSheet, View, Image } from 'react-native';
import { IconComponent } from '../components';

const s = StyleSheet.create({
  tabIcon: {
    width: 21,
    height: 21
  }
})

const TabNavigator = createBottomTabNavigator(
  {
    Feed: Feed,
    Schedule: Schedule,
    Profile: Profile
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
  }
);

export default createAppContainer(TabNavigator);

