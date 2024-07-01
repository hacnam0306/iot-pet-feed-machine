import { createAsyncThunk } from '@reduxjs/toolkit'

import { userManagementAPI } from '@api'
import { INITIAL_PAGINATION_SiZE } from '@configs'
import {
  IFetchUsersParams,
  TDeleteUserData,
  TUpdateUserData,
} from '@interfaces'

export const getAllUsersAction = createAsyncThunk(
  'users/getAllUsersAction',
  async (params: IFetchUsersParams | undefined) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const res = await userManagementAPI.getAllUsers(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getUserByIdAction = createAsyncThunk(
  'users/getUserByIdAction',
  async (id: string) => {
    try {
      const res = await userManagementAPI.getUserById(id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateUserByIdAction = createAsyncThunk(
  'users/updateUserByIdAction',
  async (payload: Partial<TUpdateUserData>, { fulfillWithValue }) => {
    try {
      const res = await userManagementAPI.updateUserById(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const addUserAction = createAsyncThunk(
  'users/addUserAction',
  async (payload: Partial<TUpdateUserData>, { fulfillWithValue }) => {
    try {
      const res = await userManagementAPI.addUser(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const recoverUserByIdAction = createAsyncThunk(
  'users/recoverUserByIdAction',
  async (payload: Partial<TUpdateUserData>, { fulfillWithValue }) => {
    try {
      const res = await userManagementAPI.recoverUserById(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteUserByIdAction = createAsyncThunk(
  'users/deleteUserByIdAction',
  async (payload: Partial<TDeleteUserData>, { fulfillWithValue }) => {
    try {
      const res = await userManagementAPI.deleteUserById(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
