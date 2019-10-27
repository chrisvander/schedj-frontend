import { StyleSheet } from 'react-native';

// dark mode
export default d => StyleSheet.create({
  rensselaerText: {
    paddingTop: 10,
    color: '#677791',
    fontSize: 18,
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },
  sisText: {
    color: d ? '#F04141' : '#AC3939',
    fontWeight: 'bold',
    fontSize: 21,
    fontFamily: 'Helvetica Neue',
    paddingBottom: 8,
  },
  textInputContainer: {
    borderColor: d ? '#546572' : '#BCE0FD',
    borderWidth: 1,
    marginTop: 16,
  },
  textInput: {
    padding: 16,
    color: d ? '#BCE0FD' : '#2699FB',
  },
  buttonContainer: {
    borderRadius: 7,
    backgroundColor: d ? '#135791' : '#2699FB',
    marginTop: 16,
    marginBottom: 16,
  },
  button: {
    padding: 16.5,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  privacy: {
    fontFamily: 'Helvetica Neue',
    fontSize: 10,
    color: d ? '#135791' : '#2699FB',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.6,
    width: '100%',
    height: '100%',
    backgroundColor: d ? 'black' : 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
