import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface WeatherProps {
  temperature: number;
  humidity: number;
}

const DetailScreen: React.FC<WeatherProps> = ({temperature, humidity}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Nhiệt độ: {temperature}°C</Text>
      <Text style={styles.text}>Độ ẩm: {humidity}%</Text>
    </View>
  );
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

export default DetailScreen;
