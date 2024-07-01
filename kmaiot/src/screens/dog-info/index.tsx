import BottomSheet, {
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRoute} from '@react-navigation/native';

import {
  Button,
  Divider,
  Icon,
  IndexPath,
  Input,
  Select,
  SelectItem,
  Spinner,
  Text,
} from '@ui-kitten/components';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import * as z from 'zod';
import {navigate} from '../../navigation/navigation';
import {authApi} from '../../redux/api/auth.api';
import {processApi, useSaveDogInfoMutation} from '../../redux/api/process.api';
import {API} from '../../redux/baseApi';
import {useAppDispatch} from '../../store';
const WINDOW_HEIGHT = Dimensions.get('window').height;
const gender = ['Male', 'Female'];
const ages = ['below 1 year', '1+ years', '3 years', '4+ years'];

const dogInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  weight: z.string(),
  origin: z.string(),
  age: z.string().optional(), // You can adjust validation for age (e.g., integer)
  gender: z.string().optional(),
  color: z.string(),
  dogImage: z.string().optional(),
});
const DogProfile = () => {
  const inset = useSafeAreaInsets();
  const params = useRoute();
  const [snapIndex, setSnapIndex] = useState(0);
  const dispatch = useAppDispatch();
  const [saveInfo, {isSuccess, isLoading}] = useSaveDogInfoMutation();
  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    setValue,
    getValues,
    control,
  } = useForm({
    resolver: zodResolver(dogInfoSchema),
    defaultValues: {
      name: '',
      weight: '',
      origin: '',
      age: '', // You can adjust validation for age (e.g., integer)
      gender: '',
      color: '',
      dogImage: '',
    },
  });

  const onSubmit = async data => {
    // Handle form submission with validated data (e.g., send to API)
    try {
      const response = await saveInfo({
        ...data,
        gender: selectedIndex.row,
        age: AgeIndex.row,
      }).unwrap();
      dispatch(processApi.util.resetApiState());
      navigate('DeviceList');
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
    }
  };
  const snapPoints = useMemo(
    () => [
      WINDOW_HEIGHT - 280 - inset.bottom,
      WINDOW_HEIGHT - 280 - inset.bottom,
    ],
    [inset.bottom],
  );
  const scrollViewBottomRef = useRef<any>();

  const handleSheetChange = useCallback((index: number) => {
    setSnapIndex(index);
  }, []);
  const [selectedIndex, setSelectedIndex] = React.useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const [AgeIndex, setAgeIndex] = React.useState<IndexPath | IndexPath[]>(
    new IndexPath(0),
  );
  useEffect(() => {
    if (params?.params?.info && params.params?.dogImage) {
      setValue('weight', params?.params?.info?.weight.join(', '));
      setValue('origin', params?.params?.info?.dog_type.join(', '));
      setValue('color', params?.params?.info?.color.join(', '));
      setValue('dogImage', params?.params?.dogImage);
    }
  }, [params]);

  return (
    <BottomSheetModalProvider>
      <StatusBar translucent backgroundColor="transparent" />

      <GestureHandlerRootView
        style={{
          flex: 1,
          paddingBottom: inset.bottom,
          backgroundColor: 'white',
        }}>
        <View
          style={[
            {
              flex: 1,
              paddingBottom: inset.bottom,
              backgroundColor: 'white',
            },
          ]}>
          <Animated.View
            style={{
              width: '100%',
              height: 350,
              position: 'absolute',
              top: 0,
              left: 0,
            }}>
            <FastImage
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode="cover"
              source={{
                uri:
                  `${API}/${getValues('dogImage')}` ||
                  'https://images.unsplash.com/photo-1501472193205-56ffb66400f0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29sZGVtJTIwcmV0cmlldmVyfGVufDB8fDB8fHww',
              }}
            />
          </Animated.View>
          <BottomSheet
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChange}>
            <BottomSheetScrollView
              style={{
                // flex: 1,
                padding: 16,
              }}>
              <View
                style={{
                  gap: 8,
                  marginBottom: 16,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    gap: 16,
                  }}>
                  <Controller
                    control={control}
                    {...register('name')}
                    render={({field}) => (
                      <Input
                        style={styles.input}
                        status="info"
                        placeholder="Dog's name"
                        onChangeText={field.onChange}
                        value={field.value}
                        caption={() => (
                          <Text style={styles.captionText}>
                            {errors.name?.message}
                          </Text>
                        )}
                        label={evaProps => (
                          <Text
                            {...evaProps}
                            style={{
                              color: '#F7931E',
                              marginBottom: 10,
                            }}>
                            Name
                          </Text>
                        )}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    {...register('weight')}
                    render={({field}) => (
                      <Input
                        style={styles.input}
                        status="info"
                        placeholder="Weight"
                        caption={() => (
                          <Text style={styles.captionText}>
                            {errors.weight?.message}
                          </Text>
                        )}
                        label={evaProps => (
                          <Text
                            {...evaProps}
                            style={{
                              color: '#F7931E',
                              marginBottom: 10,
                            }}>
                            Weight
                          </Text>
                        )}
                        onChangeText={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </View>
                <Controller
                  control={control}
                  {...register('origin')}
                  render={({field}) => (
                    <Input
                      style={styles.input}
                      status="info"
                      placeholder="Dog's origin"
                      onChangeText={field.onChange}
                      value={field.value}
                      caption={() => (
                        <Text style={styles.captionText}>
                          {errors.origin?.message}
                        </Text>
                      )}
                      label={evaProps => (
                        <Text
                          {...evaProps}
                          style={{
                            color: '#F7931E',
                            marginBottom: 10,
                          }}>
                          Origin
                        </Text>
                      )}
                    />
                  )}
                />
                <Controller
                  control={control}
                  {...register('color')}
                  render={({field}) => (
                    <Input
                      style={styles.input}
                      status="info"
                      placeholder="Dog's color"
                      caption={() => (
                        <Text style={styles.captionText}>
                          {errors.color?.message}
                        </Text>
                      )}
                      onChangeText={field.onChange}
                      value={field.value}
                      label={evaProps => (
                        <Text
                          {...evaProps}
                          style={{
                            color: '#F7931E',
                            marginBottom: 10,
                          }}>
                          Color
                        </Text>
                      )}
                    />
                  )}
                />
              </View>
              <Divider />
              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  gap: 16,
                  marginVertical: 16,
                }}>
                <Select
                  placeholder={`Age`}
                  label={evaProps => (
                    <Text
                      {...evaProps}
                      style={{
                        color: '#F7931E',
                        marginBottom: 10,
                      }}>
                      Age
                    </Text>
                  )}
                  style={{
                    flex: 1,
                  }}
                  value={ages[AgeIndex.row]}
                  selectedIndex={AgeIndex}
                  onSelect={index => setAgeIndex(index)}>
                  {ages.map(gender => (
                    <SelectItem title={gender} />
                  ))}
                </Select>
                <Select
                  style={{
                    flex: 1,
                  }}
                  value={gender[selectedIndex.row]}
                  label={evaProps => (
                    <Text
                      {...evaProps}
                      style={{
                        color: '#F7931E',
                        marginBottom: 10,
                      }}>
                      Gender
                    </Text>
                  )}
                  placeholder={`Gender`}
                  selectedIndex={selectedIndex}
                  onSelect={index => setSelectedIndex(index)}>
                  {gender.map(gender => (
                    <SelectItem title={gender} />
                  ))}
                </Select>
              </View>
              <Divider />

              <Button
                style={styles.button}
                onPress={handleSubmit(onSubmit, e => {
                  console.log('e', JSON.stringify(e, null, 2));
                })}
                status="success"
                accessoryLeft={isLoading ? LoadingIndicator : <></>}
                accessoryRight={props => (
                  <Icon {...props} name="checkmark-outline" />
                )}>
                {!isLoading ? 'Save' : 'Loading'}
              </Button>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
  );
};
const LoadingIndicator = (props: any): React.ReactElement => (
  <View style={[props.style, styles.indicator]}>
    <Spinner size="small" />
  </View>
);
export default DogProfile;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
  },
  button: {
    marginTop: 16,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: 'red',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
