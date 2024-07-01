import {
  Button,
  Card,
  Divider,
  Icon,
  Layout,
  Text,
  Toggle,
  TopNavigation,
} from '@ui-kitten/components';
import React, {useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {navigate} from '../../navigation/navigation';
import {useGetDevicesQuery} from '../../redux/api/auth.api';

const DeviceList = (): React.ReactElement => {
  const {data} = useGetDevicesQuery();

  return (
    <>
      <Layout style={styles.container} level="1">
        <StatusBar backgroundColor="#e9e8e6" />
        <TopNavigation
          alignment="center"
          title="Your Device's List"
          style={{
            backgroundColor: '#e9e8e6',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text category="h4" style={{flex: 1}}>
            Connected devices ({data?.devices.length}){' '}
          </Text>
          <Button
            appearance="ghost"
            status="primary"
            onPress={() => {
              navigate('CameraScanner');
            }}
            accessoryLeft={props => (
              <Icon {...props} name="plus-circle-outline" />
            )}
          />
        </View>
        <FlatList
          data={data?.devices || []}
          keyExtractor={item => item._id}
          numColumns={2}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <Text
              category="h5"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 80,
              }}>
              NO Device, please add device !
            </Text>
          )}
          renderItem={({item}) => <Item item={item} key={item.id} />}
        />
      </Layout>
    </>
  );
};
export default DeviceList;

const Item = ({item}: any) => {
  const [checked, setChecked] = useState(item.status == 'ON' ? true : false);
  return (
    <Card
      onPress={() => {
        if (!item.dog) {
          navigate('DogList', {
            id: item._id,
          });
          return;
        }
        navigate('DeviceDetail', {
          id: item._id,
        });
      }}
      style={{
        height: 210,
        padding: 8,
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',

          gap: 50,
        }}>
        <FastImage
          source={{
            uri: `https://kingbell.vn/wp-content/uploads/2023/03/may-cho-meo-an-tu-dong-petkit-32-1.jpg`,
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
      </View>
      <Toggle
        status="success"
        checked={checked}
        onChange={() => {
          setChecked(!checked);
        }}
        style={{
          marginTop: 16,
        }}
      />
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9e8e6',
  },
  colorBrown: {
    color: '#c3996b',
  },
});
