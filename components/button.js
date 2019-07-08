import React from 'react';
import { StyleSheet } from 'react-native';
import Button from 'react-native-button';

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 7,
    backgroundColor: '#2699FB',
    marginTop: 16,
    marginBottom: 16,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  button: {
    padding: 16.5,
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ({ onPress, children }) => (
  <Button
    activeOpacity={0.7}
    color="#FFFFFF"
    style={[styles.button]}
    containerStyle={[styles.buttonContainer]}
    onPress={onPress}
  >
    {children.toUpperCase()}
  </Button>
);
