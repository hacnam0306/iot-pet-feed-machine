import { create } from 'lodash'
//
import { createAsyncThunk } from '@reduxjs/toolkit'
import { groupUserAPI } from 'src/api/group-user-management'
import {
  IGroupUserForm,
  TGetGroupUserParams,
  TSubscribedEmailParams,
} from 'src/interfaces/group-user-management'

export const getGroupUsersAction = createAsyncThunk(
  'groupUser/getGroupUsers',
  async (payload: TGetGroupUserParams) => {
    try {
      const res = await groupUserAPI.getGroupUsers(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteGroupUserAction = createAsyncThunk(
  'groupUser/deleteGroupUser',
  async (id: number) => {
    try {
      const res = await groupUserAPI.deleteGroupUser(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListSubscribedEmailAction = createAsyncThunk(
  'groupUser/getListSubscribedEmail',
  async (payload: TSubscribedEmailParams) => {
    try {
      const res = await groupUserAPI.getListSubscribedEmail(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createGroupUserAction = createAsyncThunk(
  'groupUser/createGroupUser',
  async (payload: any) => {
    try {
      const res = await groupUserAPI.createGroupUser(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getGroupUserByIdAction = createAsyncThunk(
  'groupUser/getGroupUserById',
  async (id: number) => {
    try {
      const res = await groupUserAPI.getGroupUserById(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const editGroupUserAction = createAsyncThunk(
  'groupUser/editGroupUser',
  async (
    payload: Partial<IGroupUserForm> & {
      id: number | string
    }
  ) => {
    try {
      const res = await groupUserAPI.editGroupUser(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)
