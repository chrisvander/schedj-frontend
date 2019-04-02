import { StyleSheet } from 'react-native';

export default StyleSheet.create({
		rensselaerText: {
			paddingTop: 10,
			color: '#677791',
			fontSize: 18,
			fontWeight: '500',
			fontFamily: 'Helvetica Neue',
		},
		sisText: {
			color: '#AC3939',
			fontWeight: 'bold',
			fontSize: 21,
			fontFamily: 'Helvetica Neue',
			paddingBottom: 8,
		},
		textInputContainer: {
			borderColor: '#BCE0FD',
			borderWidth: 1,
			marginTop: 16,
		},
		textInput: {
			padding: 16,
			color: '#2699FB',
		},
		buttonContainer: {
			borderRadius: 7,
			backgroundColor: '#2699FB',
			marginTop: 16,
			marginBottom: 16
		},
		button: {
			padding: 16.5,
			color: 'white',
			fontSize: 12,
			fontWeight: 'bold'
		},
		privacy: {
			fontFamily: 'Helvetica Neue',
			fontSize: 10,
			color: '#2699FB',
		},
		overlay: {
	    flex: 1,
	    position: 'absolute',
	    left: 0,
	    top: 0,
	    opacity: 0.6,
	    width: '100%',
	    height: '100%',
	    backgroundColor: 'white',
    	justifyContent: 'center',
    	flexDirection: 'row',
	    justifyContent: 'space-around',
	    padding: 10
	  }
});