import {BaseQueryFn} from '@reduxjs/toolkit/query/react';
import {AxiosProgressEvent, AxiosRequestConfig} from 'axios';
import apiService from '../services/apiServices';

export const API = 'http://192.168.102.7:3000';
export const CDN_PATH = 'https://d2ypa602wv5j3a.cloudfront.net/';

export const SOCKET_URL = API + '/room';

export const WEB_URL = 'https://llc-web-stage.adamo.tech/';

export const axiosBaseQuery = (
  {baseUrl}: {baseUrl?: string} = {baseUrl: API},
): BaseQueryFn<{
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: AxiosRequestConfig['data'];
  params?: AxiosRequestConfig['params'];
  headers?: AxiosRequestConfig['headers'];
  onUploadProgress?: ((progressEvent: AxiosProgressEvent) => void) | undefined;
}> => {
  return async ({
    url,
    method = 'GET',
    body,
    params,
    headers,
    onUploadProgress,
  }) => {
    try {
      const result = await apiService({
        baseURL: baseUrl,
        url: url,
        method,
        data: body,
        params,
        headers,
        onUploadProgress,
      });
      return {data: result.data};
    } catch (axiosError: any) {
      const err = axiosError?.response;

      return {
        error: {
          status: err?.status,
          data: err?.data,
        },
      };
    }
  };
};
