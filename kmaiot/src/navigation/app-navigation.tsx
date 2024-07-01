import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {CameraScreen} from '../screens/camera';
import {CodeScannerPage} from '../screens/camera/CodeScanner';
import DeviceList from '../screens/device-list';
import DogProfile from '../screens/dog-info';
import DogList from '../screens/dog-list';
import DeviceDetail from '../screens/home';
import {LoginScreen} from '../screens/login';
import MealInfo from '../screens/meal-info';
import SettingScreen from '../screens/setting';
import {useAppSelector} from '../store';
import {navigation} from './navigation';

const {Navigator, Screen} = createStackNavigator();

const HomeNavigator = () => {
  const {isSignedIn} = useAppSelector(state => state.auth);
  return (
    <Navigator screenOptions={{headerShown: false}}>
      {!isSignedIn ? (
        <>
          <Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          <Screen name="DeviceList" component={DeviceList} />
          <Screen name="Camera" component={CameraScreen} />
          <Screen name="CameraScanner" component={CodeScannerPage} />
          <Screen name="DogList" component={DogList} />
          <Screen name="MealInfo" component={MealInfo} />
          <Screen name="Settings" component={SettingScreen} />
          <Screen name="DogInfo" component={DogProfile} />
          <Screen name="DeviceDetail" component={DeviceDetail} />
        </>
      )}
    </Navigator>
  );
};

export const AppNavigator = () => (
  <NavigationContainer ref={navigation}>
    <HomeNavigator />
  </NavigationContainer>
);
