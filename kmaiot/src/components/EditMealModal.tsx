import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Button,
  Card,
  Icon,
  Input,
  Layout,
  Modal,
  Text,
} from '@ui-kitten/components';
import {Controller, useForm} from 'react-hook-form';
import * as z from 'zod';
import DatePicker from 'react-native-date-picker';
import {zodResolver} from '@hookform/resolvers/zod';
const dogInfoSchema = z.object({
  quantity: z.string().min(1, 'Quantity is required'),
  time: z.date(),
});
export const ModalWithImperativeHandle = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [formIndex, setFormIndex] = useState(undefined);
  const show = ({quantity, time, index}: any) => {
    reset({
      quantity: quantity,
      time: time,
    });
    setFormIndex(index);
    setVisible(true);
  };
  const close = () => setVisible(false);
  useImperativeHandle(ref, () => ({
    show,
    close,
  }));
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
      quantity: '',
      time: new Date(),
    },
  });
  const onSubmit = async data => {
    props.update(formIndex, {
      ...data,
    });
    close();
  };
  return (
    <Modal
      visible={visible}
      style={{
        width: 300,
      }}
      backdropStyle={styles.backdrop}
      onBackdropPress={() => setVisible(false)}>
      <Card>
        <Controller
          control={control}
          {...register('quantity')}
          render={({field}) => (
            <Input
              style={styles.input}
              status={errors.quantity ? 'danger' : 'basic'}
              placeholder="Food's quantity"
              onChangeText={field.onChange}
              keyboardType="numeric"
              value={field.value}
              caption={errors.quantity?.message}
              label={evaProps => (
                <Text
                  {...evaProps}
                  style={{
                    color: '#F7931E',
                    marginBottom: 10,
                  }}>
                  Quantity
                </Text>
              )}
            />
          )}
        />

        <Controller
          control={control}
          {...register('time')}
          render={({field}) => (
            <>
              <DatePicker
                mode="time"
                date={getValues('time')}
                onDateChange={date => {
                  setValue('time', date);
                }}
              />
            </>
          )}
        />
        <Button
          style={styles.button}
          onPress={handleSubmit(onSubmit, e => {
            console.log('e', JSON.stringify(e, null, 2));
          })}
          status="success"
          accessoryRight={props => (
            <Icon {...props} name="checkmark-outline" />
          )}>
          Save
        </Button>
      </Card>
    </Modal>
  );
});

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
  },
  container: {},
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
