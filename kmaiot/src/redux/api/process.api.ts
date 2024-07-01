import {createApi} from '@reduxjs/toolkit/query/react';
import {axiosBaseQuery} from '../baseApi';

export const processApi = createApi({
  reducerPath: 'processApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Process', 'Device'],
  endpoints: builder => ({
    predictDog: builder.mutation<any, any>({
      query: body => ({
        url: '/ai/predict',
        method: 'POST',
        body,
      }),
    }),
    generateScheduleAI: builder.mutation<any, any>({
      query: body => ({
        url: '/ai/predict/meal',
        method: 'POST',
        body,
      }),
    }),
    saveDogInfo: builder.mutation<any, any>({
      query: body => ({
        url: '/dog',
        method: 'POST',
        body,
      }),
    }),
    updateDevice: builder.mutation<any, any>({
      query: ({id, ...body}) => ({
        url: `/device/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, {device}) => [
        {type: 'Device', id: device},
        'Process',
      ],
    }),
    getDeviceInfo: builder.query<any, any>({
      query: id => ({
        url: `/device/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, {id}) => [{type: 'Device', id: id}],
    }),
    saveDogSchedule: builder.mutation<any, any>({
      query: body => ({
        url: '/time/setup',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, {device}) => [
        {type: 'Device', id: device},
      ],
    }),
    updateDogSchedule: builder.mutation<any, any>({
      query: ({device, ...body}) => ({
        url: `/time/${device}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, {device}) => [
        {type: 'Device', id: device},
      ],
    }),
    getPets: builder.query<any, void>({
      query: () => ({
        url: '/users/pets',
        method: 'GET',
      }),
      providesTags: ['Process'],
    }),
    uploadMedia: builder.mutation<any, any>({
      query: body => ({
        url: '/upload',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    }),
  }),
});

export const {
  usePredictDogMutation,
  useUploadMediaMutation,
  useSaveDogInfoMutation,
  useSaveDogScheduleMutation,
  useUpdateDeviceMutation,
  useGetPetsQuery,
  useGetDeviceInfoQuery,
  useUpdateDogScheduleMutation,
  useGenerateScheduleAIMutation,
} = processApi;
