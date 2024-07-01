import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface WeatherProps {}

const Information: React.FC<WeatherProps> = () => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Information;
