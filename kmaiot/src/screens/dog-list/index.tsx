import {useRoute} from '@react-navigation/native';
import {
  Button,
  Card,
  Divider,
  Icon,
  IconElement,
  Layout,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {TouchableWebElement} from '@ui-kitten/components/devsupport';
import React, {useRef, useState} from 'react';
import {FlatList, StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {goBack, navigate} from '../../navigation/navigation';
import {
  useUpdateDeviceMutation,
  useGetPetsQuery,
  processApi,
} from '../../redux/api/process.api';
import {API} from '../../redux/baseApi';
import {useAppDispatch} from '../../store';

const BackIcon = (props): IconElement => <Icon {...props} name="arrow-back" />;

const EditIcon = (props): IconElement => (
  <Icon {...props} name="checkmark-outline" />
);

const DogList = (): React.ReactElement => {
  const {data} = useGetPetsQuery();
  const [select, setSelect] = useState(undefined);
  const [updateDevice, {isSuccess}] = useUpdateDeviceMutation();
  const params = useRoute();
  const dispatch = useAppDispatch();

  const onUpdateInfo = async () => {
    try {
      const response = await updateDevice({
        id: params?.params.id,
        dog: select,
      });
      dispatch(processApi.util.resetApiState());
      navigate('DeviceDetail', {
        id: response?.device?._id,
      });
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
    }
  };
  const renderRightActions = (): React.ReactElement => (
    <>
      <TopNavigationAction icon={EditIcon} onPress={onUpdateInfo} />
    </>
  );

  const renderBackAction = (): TouchableWebElement => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );

  return (
    <>
      <Layout style={styles.container} level="1">
        <StatusBar backgroundColor="#e9e8e6" />
        <TopNavigation
          alignment="center"
          title="Your Pet's List"
          style={{
            backgroundColor: '#e9e8e6',
          }}
          accessoryLeft={renderBackAction}
          accessoryRight={select && renderRightActions}
        />
        <FlatList
          data={data?.pets || []}
          keyExtractor={item => item._id}
          ListHeaderComponent={() => (
            <Button
              status="primary"
              onPress={() => {
                navigate('Settings');
              }}
              accessoryLeft={props => (
                <Icon {...props} name="plus-circle-outline" />
              )}>
              Add new pet
            </Button>
          )}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <Card
              status={select === item._id ? 'success' : 'control'}
              onPress={() => {
                if (select !== item._id) {
                  setSelect(item._id);
                } else {
                  setSelect(undefined);
                }
              }}
              style={{
                height: 180,
                padding: 8,
                flex: 1,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  gap: 50,
                }}>
                <FastImage
                  source={{uri: `${API}/${item.dogImage}`}}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                  }}
                  resizeMode="cover"
                />
                <View
                  style={{
                    gap: 16,
                  }}>
                  <Text category="h5">{item?.name}</Text>
                  <Text category="s1">{item.weight}</Text>
                  <Text category="s1">{item.color}</Text>
                </View>
              </View>
            </Card>
          )}
        />
      </Layout>
    </>
  );
};
export default DogList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e9e8e6',
  },
  colorBrown: {
    color: '#c3996b',
  },
});
