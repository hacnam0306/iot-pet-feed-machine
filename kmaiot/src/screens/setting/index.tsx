import {Button, Icon, Text} from '@ui-kitten/components';
import React from 'react';
import {ImageBackground, StatusBar, StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ImageCropPicker from 'react-native-image-crop-picker';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {navigate} from '../../navigation/navigation';
import {
  usePredictDogMutation,
  useUploadMediaMutation,
} from '../../redux/api/process.api';

const SettingScreen = () => {
  const insets = useSafeAreaInsets();
  const [predict, {isSuccess}] = usePredictDogMutation();
  const [upload, {isSuccess: isSuccessUpload}] = useUploadMediaMutation();
  const openCamera = async () => {
    try {
      const data: any = await ImageCropPicker.openCamera({
        compressImageQuality: 0.1,
        compressImageMaxHeight: 300,
        compressImageMaxWidth: 300,
        clean: true,
        includeBase64: true,
        mediaType: 'photo',
      });
      const formData = new FormData();

      formData.append('image', {
        uri: data.path,
        type: data.mime, // Adjust based on image type (e.g., png, gif)
        name: data.path
          ?.replace(/^.*[\\/]/, '')
          ?.replace('.MOV', '.mp4')
          ?.replace('.HEIC', '.jpg')
          ?.replace('.heic', '.jpg'), // Optional filename for server-side reference
      });
      const imageResponse = await upload(formData).unwrap();
      const response = await predict({
        imageData: {
          inlineData: {
            data: data.data,
            mimeType: data.mime,
          },
        },
      }).unwrap();
      navigate('DogInfo', {
        info: response,
        dogImage: imageResponse.imagePath,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const openLibrary = async () => {
    try {
      const data = await ImageCropPicker.openPicker({
        compressImageQuality: 1,
        clean: true,
        maxFiles: 1,
        includeExif: true,
        mediaType: 'photo',
        includeBase64: true,
      });

      const formData = new FormData();

      formData.append('image', {
        uri: data.path,
        type: data.mime, // Adjust based on image type (e.g., png, gif)
        name: data.path
          ?.replace(/^.*[\\/]/, '')
          ?.replace('.MOV', '.mp4')
          ?.replace('.HEIC', '.jpg')
          ?.replace('.heic', '.jpg'), // Optional filename for server-side reference
      });
      const imageResponse = await upload(formData).unwrap();
      const response = await predict({
        imageData: {
          inlineData: {
            data: data.data,
            mimeType: data.mime,
          },
        },
      }).unwrap();
      navigate('DogInfo', {
        info: response,
        dogImage: imageResponse.imagePath,
      });
    } catch (error) {
      console.log('error', JSON.stringify(error, null, 2));
      ////////////////////////////////////////////////////////////////ssssssssssssss
    }
  };
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../../assets/images/image_welcome.jpg')}
        style={[
          styles.container,
          {
            paddingBottom: insets.bottom + 18,
          },
        ]}
        resizeMode={'cover'}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>Let us know your pet</Text>
        </View>
        <View style={styles.flexRow}>
          <Button
            style={[styles.btnSkip]}
            appearance="ghost"
            onPress={openCamera}>
            {evaProps => (
              <Text
                {...evaProps}
                style={{
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Open camera
              </Text>
            )}
          </Button>
          <Button style={styles.btnJoinUs} onPress={openLibrary}>
            {evaProps => (
              <Text
                {...evaProps}
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                }}>
                Open library
              </Text>
            )}
          </Button>
        </View>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
    gap: 16,
    alignSelf: 'flex-end',
    marginBottom: 40,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#D4E25A',
    paddingHorizontal: 20,
    maxWidth: 200,
    lineHeight: 50,
  },
  title2: {
    color: 'white',
  },
  btnText: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 1.6,
    textDecorationLine: 'none',
    color: 'white',
  },
  arrow: {
    width: 21,
    height: 10,
    marginLeft: 6,
  },
  btnJoinUs: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    backgroundColor: 'white',
    borderColor: 'transparent',
  },
  btnSkip: {
    flex: 1,
    height: 60,
    gap: 12,
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
    backgroundColor: '#F7931E',
  },
});

export default SettingScreen;
