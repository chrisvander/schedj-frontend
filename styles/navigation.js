import { StyleSheet } from 'react-native';
import FN from './normalize.js';

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
			height: FN(120),
			paddingLeft: 16,
			paddingBottom: 6,
			justifyContent: 'space-between',
			backgroundColor: '#FFFFFF',
			flexDirection: 'row'
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