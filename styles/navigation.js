import { StyleSheet } from 'react-native';

export default StyleSheet.create({
		subTitle: {
			fontSize: 14,
    	fontFamily: 'System',
    	fontWeight: '600',
    	color: '#8E8E93',
		},
		bigTitle: {
			fontSize: 34,
    	fontFamily: 'System',
    	fontWeight: 'bold'
		},
		largeNavBarView: {
			height: 120,
			paddingLeft: 16,
			paddingBottom: 6,
			justifyContent: 'space-between',
			backgroundColor: '#FFFFFF',
			flexDirection: 'row'
		},
		largeNavBarContainer: {
			shadowColor: "#000000",
	    shadowOpacity: 0.16,
	    elevation: 5,
	    shadowRadius: 10,
	    shadowOffset: {
	      height: 3,
	      width: 1
	    },
	    height: '100%',
	    width: '100%'
		},
		gearContainer: {
			flexDirection: 'column',
			alignSelf: 'flex-end',
			paddingBottom: 6,
			paddingRight: 16
		},
		gear: {
			width: 36, 
			height: 36
		}
});