import { createAsyncThunk } from '@reduxjs/toolkit'
import { emailContentAPI } from 'src/api/email-content-management'
import {
  IEmailContentForm,
  TGetEmailContentsParams,
} from 'src/interfaces/email-content-management'

export const getEmailContentsAction = createAsyncThunk(
  'emailContent/getEmailContents',
  async (payload: TGetEmailContentsParams) => {
    try {
      const res = await emailContentAPI.getEmailContents(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteEmailContentAction = createAsyncThunk(
  'emailContent/deleteEmailContent',
  async (id: number) => {
    try {
      const res = await emailContentAPI.deleteEmailContent(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getDetailEmailContentAction = createAsyncThunk(
  'emailContent/getDetailEmailContent',
  async (id: number) => {
    try {
      const res = await emailContentAPI.getDetailEmailContent(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createEmailContentAction = createAsyncThunk(
  'emailContent/createEmailContent',
  async (payload: any) => {
    try {
      const res = await emailContentAPI.createEmailContent(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateEmailContentAction = createAsyncThunk(
  'emailContent/updateEmailContent',
  async (
    payload: IEmailContentForm & {
      id: number | string
    }
  ) => {
    try {
      const res = await emailContentAPI.updateEmailContent(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const duplicateEmailContentAction = createAsyncThunk(
  'emailContent/duplicateEmailContent',
  async (id: number) => {
    try {
      const res = await emailContentAPI.duplicateEmailContent(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const resendEmailContentAction = createAsyncThunk(
  'emailContent/resendEmailContent',
  async (id: number) => {
    try {
      const res = await emailContentAPI.resendEmailContent(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
