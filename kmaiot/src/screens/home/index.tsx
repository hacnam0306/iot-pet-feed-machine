import {useRoute} from '@react-navigation/native';
import {Button, Card, Icon, Layout, Spinner, Text} from '@ui-kitten/components';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';
import SwipeButton from 'rn-swipe-button';
import MQTT from 'sp-react-native-mqtt';
import {navigate} from '../../navigation/navigation';
import {API} from '../../redux/baseApi';
import {useAppSelector} from '../../store';
import {useSocketObserver} from '../../utils/SocketConnect';

const clientId = 'client' + Math.random().toString(36).substring(7);
const mqttHost = 'broker.emqx.io';
const protocol = 'mqtt';
const port = '1883';
const hostURL = `${protocol}://${mqttHost}:${port}`;

function getNearestHigherTimeIndex(data: {time: string}[]): number {
  // Get the current time components
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // Loop through each time entry in the data
  let nearestHigherIndex = -1;
  let minDiff = Infinity;

  for (let i = 0; i < data.length; i++) {
    // Parse the time string from the data object
    const entryTime = new Date(data[i].time);

    // Extract hour and minute from entry time
    const entryHour = entryTime.getHours();
    const entryMinute = entryTime.getMinutes();

    // Calculate the time difference in minutes (ignoring seconds)
    const timeDiff =
      entryHour * 60 + entryMinute - (currentHour * 60 + currentMinute);

    // If the difference is positive (future time) and smaller than current minimum difference
    if (timeDiff > 0 && timeDiff < minDiff) {
      minDiff = timeDiff;
      nearestHigherIndex = i;
    }
  }

  // Return the index of the nearest higher time or -1 if none found
  return nearestHigherIndex;
}
const DeviceDetail = (): React.ReactElement => {
  const {user} = useAppSelector(state => state.auth);
  const {device} = useAppSelector(state => state.counter);
  const params = useRoute();

  const client = MQTT.createClient({
    uri: hostURL,
    user: 'iot_demo',
    pass: 'iot_demo',
    clientId: clientId,
    auth: true,
  })
    .then(function (client) {
      client.on('closed', function () {
        console.log('mqtt.event.closed');
      });

      client.on('error', function (msg) {
        console.log('mqtt.event.error', msg);
      });

      client.on('message', function (msg) {
        // console.log('mqtt.event.message', msg);
      });

      client.on('connect', function () {
        console.log('connected');
        client.publish(`update_sub_Battery_${params?.params?.id}`, '', 0, true);
      });

      client.connect();
    })
    .catch(function (err) {
      console.log(err);
    });
  const barData = [
    {
      value: 230,
      label: 'Mom',
      frontColor: '#4ABFF4',
      sideColor: '#23A7F3',
      topColor: '#92e6f6',
    },
    {
      value: 180,
      label: 'Tue',
      frontColor: '#79C3DB',
      sideColor: '#68BCD7',
      topColor: '#9FD4E5',
    },
    {
      value: 195,
      label: 'Web',
      frontColor: '#28B2B3',
      sideColor: '#0FAAAB',
      topColor: '#66C9C9',
    },
    {
      value: 250,
      label: 'Thud',
      frontColor: '#4ADDBA',
      sideColor: '#36D9B2',
      topColor: '#7DE7CE',
    },
    {
      value: 320,
      label: 'Fri',
      frontColor: '#91E3E3',
      sideColor: '#85E0E0',
      topColor: '#B0EAEB',
    },
  ];
  const [isLoading, setIsLoading] = useState(false);
  const {socket, listenEvent} = useSocketObserver();
  useEffect(() => {
    socket?.connect();

    listenEvent();

    return () => {
      socket?.disconnect();
    };
  }, [socket]);
  useEffect(() => {
    socket?.emit('join_device', {
      deviceId: params?.params?.id,
      userId: user?._id,
    });
  }, [socket]);

  return !isLoading ? (
    <Layout
      style={{
        backgroundColor: '#C5CEE0',
        padding: 16,
        flex: 1,
        gap: 8,
      }}>
      <View
        style={[
          styles.topContainer,
          {
            gap: 8,
          },
        ]}>
        <Card
          style={[
            styles.card,
            {
              backgroundColor: '#222B45',
              borderRadius: 16,
            },
          ]}>
          <Button
            appearance="ghost"
            status="info"
            accessoryLeft={<Icon name="globe-2-outline" />}>
            <Text
              category="s1"
              style={{
                color: 'white',
              }}>
              Food Left
            </Text>
          </Button>
          <Text
            category="h3"
            style={{
              color: 'white',
              marginTop: 16,
            }}>
            {device?.foodLevel}g
          </Text>
        </Card>
        <Card
          style={[
            styles.card,
            {
              backgroundColor: '#EDF1F7',
              borderRadius: 16,
            },
          ]}>
          <Button
            appearance="ghost"
            status="warning"
            accessoryLeft={<Icon name="charging-outline" />}>
            <Text
              category="s1"
              style={{
                color: 'white',
              }}>
              Charge
            </Text>
          </Button>
          <Text
            category="h3"
            style={{
              color: '#42AAFF',
              marginTop: 16,
            }}>
            {device?.battery || 0}%
          </Text>
        </Card>
      </View>
      <BarChart
        showYAxisIndices
        hideRules
        noOfSections={4}
        maxValue={400}
        data={barData}
        barWidth={40}
        sideWidth={15}
        isThreeD
        side="right"
      />
      <ImageBackground
        style={{
          padding: 8,
          height: 300,
        }}
        imageStyle={{
          borderRadius: 16,
        }}
        source={{
          uri: `${API}/${device?.dog?.dogImage}`,
        }}>
        <View style={styles.overlay} />
        <TouchableOpacity
          onPress={() => {
            navigate('MealInfo', {
              deviceId: params?.params?.id,
              scheduleId: device?.schedule?._id,
            });
          }}
          style={{
            flex: 1,
          }}>
          {!!device?.schedule?._id ? (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text
                category="h6"
                style={{
                  color: '#EDF1F7',
                }}>
                Upcoming Feed
              </Text>
              <View
                style={{
                  gap: 8,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text
                  category="h6"
                  style={{
                    color: '#EDF1F7',
                  }}>
                  {dayjs(
                    device?.schedule?.schedule[
                      getNearestHigherTimeIndex(device?.schedule?.schedule)
                    ]?.time,
                  ).format('HH:mm  A')}
                </Text>
                <Text
                  category="h6"
                  style={{
                    color: '#EDF1F7',
                  }}>
                  {
                    device?.schedule?.schedule[
                      getNearestHigherTimeIndex(device?.schedule?.schedule)
                    ]?.quantity
                  }
                  g
                </Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Button
              appearance="outline"
              status="warning"
              onPress={() => {
                navigate('MealInfo', {
                  deviceId: params?.params?.id,
                });
              }}>
              Auto feed
            </Button>
          )}
          <Text
            category="h3"
            style={{
              color: '#EDF1F7',
              marginTop: 16,
            }}>
            Last feed:{' '}
            {device?.lastFeed
              ? dayjs(device?.lastFeed).format('HH:mm  A')
              : dayjs(
                  device?.schedule?.schedule[
                    getNearestHigherTimeIndex(device?.schedule?.schedule) - 1
                  ]?.time,
                ).format('HH:mm  A')}
          </Text>
        </TouchableOpacity>

        <SwipeButton
          enableReverseSwipe
          onSwipeSuccess={() => {
            socket?.emit('feed_dog', {
              deviceId: params?.params?.id,
              userId: user?._id,
              quantity:
                device?.schedule?.schedule[
                  getNearestHigherTimeIndex(device?.schedule?.schedule)
                ],
            });
          }}
          railBackgroundColor="#51F0B0"
          thumbIconBackgroundColor="#F2F8FF"
          title="Feed now"
        />
      </ImageBackground>
    </Layout>
  ) : (
    <Spinner status="success" />
  );
};

export default DeviceDetail;
const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
  },
  card: {
    flex: 1,
    margin: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
