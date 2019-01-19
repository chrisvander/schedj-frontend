import { Feed, Schedule, Profile } from "../views";
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

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
  		},
  	}),
    tabBarOptions: {
    	tabBarPosition: 'bottom',
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#68B8FC',
      showLabel: true,
      style: {
      	backgroundColor: '#2699FB'
      }
    },
  }
);

export default createAppContainer(TabNavigator);

