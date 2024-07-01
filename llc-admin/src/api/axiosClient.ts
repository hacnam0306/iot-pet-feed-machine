/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { message } from 'antd'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

import { LLC_ACCESS_TOKEN } from '@configs'
import { LogApp } from '@utils'
import { authActions, store } from 'src/redux'
import { BaseResponseProps } from '../interfaces'
import { PATH_LOGIN } from '../routes/navigation'

const queryString = require('query-string')

const CancelToken = axios.CancelToken
const source = CancelToken.source()
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_PUBLIC_API_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
})

axiosClient.interceptors.request.use((config: any) => {
  const token = Cookies.get(LLC_ACCESS_TOKEN)
  config.headers['Authorization'] = `Bearer ${token}`
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error: AxiosError<any, any>) => {
    if (error.response && error.response.status === 401) {
      //logout
      Cookies.remove(LLC_ACCESS_TOKEN)
      sessionStorage.clear()
      store.dispatch(authActions.logout())
      window.location.replace(PATH_LOGIN)
    }
    if (error.response) {
      LogApp('aewr', error.response.data)
      // Request made and server responded
      throw error.response.data
    } else if (error.request) {
      // The request was made but no response was received
      LogApp(error.request)
      message.error({
        content: 'Oops, something went wrong',
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      LogApp('Error', error.message)
    }
    throw error
  }
)

export const ApiClient = {
  get: <T>(url: string, config?: AxiosRequestConfig<any>) =>
    axiosClient.get<T, BaseResponseProps<T>>(url, config),
  post: <T, D = any>(url: string, payload?: D) =>
    axiosClient.post<T, BaseResponseProps<T>, D>(url, payload),
  put: <T, D = any>(url: string, payload?: D) =>
    axiosClient.put<T, BaseResponseProps<T>, D>(url, payload),
  delete: <T, D = any>(url: string, payload?: D) =>
    axiosClient.delete<T, BaseResponseProps<T>, D>(url, { data: payload }),
  patch: <T, D = any>(url: string, payload?: D) =>
    axiosClient.patch<T, BaseResponseProps<T>, D>(url, payload),
}

export default axiosClient
