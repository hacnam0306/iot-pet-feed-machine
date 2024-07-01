import React, {useEffect, useRef} from 'react';
import {
  Button,
  Card,
  Divider,
  Icon,
  IconElement,
  Layout,
  MenuItem,
  OverflowMenu,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import {ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import {TouchableWebElement} from '@ui-kitten/components/devsupport';
import {ModalWithImperativeHandle} from '../../components/EditMealModal';
import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {
  useGenerateScheduleAIMutation,
  useGetDeviceInfoQuery,
  useSaveDogScheduleMutation,
  useUpdateDeviceMutation,
  useUpdateDogScheduleMutation,
} from '../../redux/api/process.api';
import {goBack, navigate, reset} from '../../navigation/navigation';
import {useRoute} from '@react-navigation/native';

const BackIcon = (props): IconElement => <Icon {...props} name="arrow-back" />;

const EditIcon = (props): IconElement => (
  <Icon {...props} name="checkmark-outline" />
);

const MenuIcon = (props): IconElement => (
  <Icon {...props} name="more-vertical" />
);
const DeleteIcon = (props): IconElement => (
  <Icon {...props} name="trash-2-outline" />
);
const questionSchema = z.object({
  schedule: z
    .array(
      z.object({
        quantity: z.number().min(1, 'Quantity is required'),
        time: z.date(),
      }),
    )
    .min(1, {
      message: 'error nef',
    }),
});
const MealInfo = (): React.ReactElement => {
  const ref = useRef();
  const params = useRoute();

  const [saveSchedule] = useSaveDogScheduleMutation();
  const [updateSchedule] = useUpdateDogScheduleMutation();
  const defaultValue = {
    meals: [],
  };

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: {isDirty, errors},
  } = useForm<any>({
    defaultValues: defaultValue,
    resolver: zodResolver(questionSchema),
  });
  const {fields, append, remove, update} = useFieldArray({
    control: control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'meals', // unique name for your Field Array
  });
  const [predict, {isSuccess}] = useGenerateScheduleAIMutation();

  const {data: deviceData, isLoading} = useGetDeviceInfoQuery(
    params?.params?.deviceId,
    {
      skip: !params?.params?.scheduleId,
    },
  );
  const predictDogMeal = async () => {
    try {
      const response = await predict({
        information: {
          origin: deviceData?.device?.dog?.origin,
          weight: deviceData?.device?.dog?.weight,
          age: deviceData?.device?.dog.age,
          gender: deviceData?.device?.gender,
          color: deviceData?.device?.dog?.color,
        },
      }).unwrap();
      console.log('response', JSON.stringify(response, null, 2));
      const info = JSON.parse(response.schedule);
      console.log('info', JSON.stringify(info, null, 2));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!params?.params?.scheduleId) return;
    setValue('meals', deviceData?.device?.schedule?.schedule || []);
  }, [isLoading, deviceData]);
  const renderRightActions = (): React.ReactElement => (
    <>
      <TopNavigationAction
        icon={EditIcon}
        onPress={async data => {
          try {
            if (params?.params?.scheduleId) {
              const response = await updateSchedule({
                schedule: fields.map(item => {
                  return {
                    ...item,
                    kcal: Math.round(item.quantity / 100),
                  };
                }),
                device: params?.params?.scheduleId,
              }).unwrap();
              goBack();
              return;
            }
            const response = await saveSchedule({
              schedule: fields.map(item => {
                return {
                  ...item,
                  kcal: Math.round(item.quantity / 100),
                };
              }),
              device: params?.params?.deviceId,
            }).unwrap();
            goBack();
          } catch (error) {
            console.log('error', JSON.stringify(error, null, 2));
          }
        }}
      />
    </>
  );
  const openModal = ({quantity, time, index}: any) => {
    ref.current?.show({quantity, time, index});
  };
  const renderBackAction = (): TouchableWebElement => (
    <TopNavigationAction icon={BackIcon} onPress={goBack} />
  );
  const getTotalValue = () => {
    return fields.reduce((a, b) => a + +b.quantity, 0);
  };
  return (
    <>
      <Layout style={styles.container} level="1">
        <StatusBar backgroundColor="#e9e8e6" />
        <TopNavigation
          alignment="center"
          title="Auto feeding"
          accessoryLeft={renderBackAction}
          style={{
            backgroundColor: '#e9e8e6',
          }}
          accessoryRight={renderRightActions}
        />

        <View
          style={{
            padding: 16,
            gap: 16,
          }}>
          <Button
            appearance="outline"
            status="warning"
            onPress={predictDogMeal}>
            AI suggest Optimal meal's pet
          </Button>
          <Card
            style={{
              borderRadius: 8,
            }}
            header={() => (
              <View
                style={{
                  padding: 8,
                }}>
                <Text category="h6" style={styles.colorBrown}>
                  Daily Portion
                </Text>
              </View>
            )}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                gap: 16,
              }}>
              <Text category="h1" style={styles.colorBrown}>
                {getTotalValue()}g
              </Text>
              <Text>Recommend: 390kcal</Text>
            </View>
          </Card>
          <Card
            style={{
              borderRadius: 8,
            }}
            header={() => (
              <View
                style={{
                  padding: 8,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text category="h6" style={{flex: 1}}>
                  Schedule
                </Text>
                <Button
                  appearance="ghost"
                  onPress={() => {
                    append({
                      quantity: 0,
                      time: new Date(),
                    });
                  }}
                  accessoryLeft={props => (
                    <Icon {...props} name="plus-circle-outline" />
                  )}
                />
              </View>
            )}>
            {fields?.map((item, index) => {
              return (
                <MealItem
                  key={item.id}
                  item={item}
                  index={index}
                  openModal={openModal}
                  remove={remove}
                />
              );
            })}
          </Card>
        </View>
      </Layout>
      <ModalWithImperativeHandle ref={ref} update={update} />
    </>
  );
};
export default MealInfo;

const MealItem = ({item, openModal, remove, index}: any) => {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const toggleMenu = (): void => {
    setMenuVisible(!menuVisible);
  };
  const onItemSelect = (_index: any): void => {
    if (_index.row === 0) {
      openModal({
        quantity: item.quantity,
        time: new Date(item.time),
        index: index,
      });
    } else {
      remove(index);
    }
    setMenuVisible(false);
  };
  const renderRightTimeAction = (): React.ReactElement => (
    <>
      {/* <TopNavigationAction icon={EditIcon} /> */}
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onSelect={onItemSelect}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={EditIcon} title="Edit" />
        <MenuItem accessoryLeft={DeleteIcon} title="Delete" />
      </OverflowMenu>
    </>
  );
  const renderMenuAction = (): React.ReactElement => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );
  return (
    <View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 8,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text category="h4">
              {new Date(item?.time)?.toLocaleTimeString('en-US')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text category="h5" style={styles.colorBrown}>
              {item.quantity}g
            </Text>
            {renderRightTimeAction()}
          </View>
        </View>
      </View>
      <Divider />
    </View>
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
