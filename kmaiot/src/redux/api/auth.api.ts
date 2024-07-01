import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../baseApi';

export const authApi = createApi({
  reducerPath: 'authApi',
  tagTypes: ['Auth'],
  baseQuery: axiosBaseQuery(),
  endpoints: builder => ({
    signUp: builder.mutation<any, any>({
      query: body => ({
        url: 'users',
        method: 'POST',
        body,
      }),
    }),
    signIn: builder.mutation<any, any>({
      query: body => ({
        url: 'users/login',
        method: 'POST',
        body,
      }),
    }),

    getDevices: builder.query<any, void>({
      query: () => ({
        url: 'users/device',
        method: 'GET',
      }),
    }),
    logOut: builder.mutation<any, unknown>({
      query: () => ({
        url: 'users/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  useLogOutMutation,
  useSignUpMutation,
  useSignInMutation,
  useGetDevicesQuery,
} = authApi;
