import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Input, Button} from '@ui-kitten/components';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSignInMutation} from '../../redux/api/auth.api';
import {useAppDispatch} from '../../store';
import Toast from 'react-native-toast-message';
import {navigate} from '../../navigation/navigation';
// Define your form schema using Zod
const schema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z
    .string()
    .min(7, {message: 'Password should be at least 7 characters long'}),
});

// TypeScript interface for the form values
interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const defaultForm = {
    email: 'hung123@gmail.com',
    password: '02adaddad1',
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultForm,
  });

  const [signIn, {isLoading}] = useSignInMutation();
  const dispatch = useAppDispatch();
  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response.user) {
        navigate('Settings');
      }
    } catch (error: any) {
      console.log('error', JSON.stringify(error, null, 2));
      // Toast.show(error?.data?.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Controller
        control={control}
        name="email"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Email"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            status={errors.email ? 'danger' : 'basic'}
            caption={errors.email?.message}
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            placeholder="Password"
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            status={errors.password ? 'danger' : 'basic'}
            caption={errors.password?.message}
          />
        )}
      />
      <Button style={styles.loginButton} onPress={handleSubmit(onSubmit)}>
        Login
      </Button>
      <Button
        style={styles.registerButton}
        appearance="ghost"
        onPress={() => console.log('Navigate to register')}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f6f1ec', // Change background color here
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 50,
  },
  input: {
    marginBottom: 20,
  },
  loginButton: {
    marginBottom: 20,
    backgroundColor: '#3366ff', // Change button background color here
    borderColor: '#3366ff', // Change button border color here
  },
  registerButton: {
    borderColor: '#3366ff', // Change ghost button border color here
  },
});

// Replace 'https://your-logo-url.com/logo.png' with your actual logo URL.
