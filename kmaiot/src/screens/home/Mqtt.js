import React, {Component} from 'react';
import init from 'react_native_mqtt';
import {StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

init({
  size: 10000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
  sync: {},
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
});

const clientId = 'client' + Math.random().toString(36).substring(7);
const mqttHost = '42.113.220.96';
const protocol = 'mqtt';
const port = '1883';
const hostURL = `${protocol}://${mqttHost}:${port}`;
export default class MqttLog extends Component {
  constructor(props) {
    super(props);

    const client = new Paho.MQTT.Client(mqttHost, 3000, clientId);
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    client.connect({onSuccess: this.onConnect, useSSL: true});

    this.state = {
      text: ['...'],
      client,
    };
  }

  pushText = entry => {
    const {text} = this.state;
    this.setState({text: [...text, entry]});
  };

  onConnect = () => {
    const {client} = this.state;
    client.subscribe('temperature');
    this.pushText('connected');
  };

  onConnectionLost = responseObject => {
    if (responseObject.errorCode !== 0) {
      this.pushText(`connection lost: ${responseObject.errorMessage}`);
    }
  };

  onMessageArrived = message => {
    this.pushText(`new message: ${message.payloadString}`);
  };

  render() {
    const {text} = this.state;

    return (
      <View style={styles.container}>
        {text.map(entry => (
          <Text>{entry}</Text>
        ))}
      </View>
    );
  }
}
