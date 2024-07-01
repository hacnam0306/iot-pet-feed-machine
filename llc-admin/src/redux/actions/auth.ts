import { createAsyncThunk } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import { authAPI } from '@api'
import {
  IChangePasswordFields,
  ILoginFields,
  IResendCode,
  IResetPassword,
  IVerifyForgotPassword,
} from '@interfaces'
import { LLC_ACCESS_TOKEN, thunkActionType } from '@configs'
import { profileAPI } from 'src/api/profile'

export const loginAction = createAsyncThunk(
  thunkActionType.LOGIN_ACTION,
  async (payload: ILoginFields, { fulfillWithValue, rejectWithValue }) => {
    try {
      const reponseLogin: any = await authAPI.login(payload)
      if (reponseLogin?.token) {
        Cookies.set(LLC_ACCESS_TOKEN, reponseLogin.token)

        return fulfillWithValue(reponseLogin)
      }
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const forgotPasswordAction = createAsyncThunk(
  thunkActionType.FORGOT_PASSWORD_ACTION,
  async (payload: ILoginFields, { fulfillWithValue }) => {
    const { email } = payload
    const res: any = await authAPI.forgotPassword({ email })

    if (res.success) {
      return fulfillWithValue({
        ...res,
        data: {
          ...res.data,
          email,
        },
      })
    }
    return fulfillWithValue(null)
  }
)

export const verifyPasswordAction = createAsyncThunk(
  thunkActionType.VERIFY_PASSWORD_ACTION,
  async (payload: IVerifyForgotPassword, { fulfillWithValue }) => {
    const res = await authAPI.verifyPassword(payload)

    if (res.success) {
      return fulfillWithValue({
        ...res,
      })
    }
    return fulfillWithValue(null)
  }
)

export const resendCodeAction = createAsyncThunk(
  thunkActionType.RESEND_CODE_ACTION,
  async (payload: IResendCode, { fulfillWithValue }) => {
    const res = await authAPI.resendCode(payload)

    if (res.success) {
      return fulfillWithValue({
        ...res,
      })
    }
    return fulfillWithValue(null)
  }
)

export const resetPasswordAction = createAsyncThunk(
  thunkActionType.RESET_PASSWORD_ACTION,
  async (payload: IResetPassword, { fulfillWithValue }) => {
    const res = await authAPI.resetPassword(payload)

    if (res.success) {
      return fulfillWithValue(res)
    }
    return fulfillWithValue(null)
  }
)

export const changePasswordAction = createAsyncThunk(
  thunkActionType.CHANGE_PASSWORD_ACTION,
  async (
    payload: IChangePasswordFields,
    { fulfillWithValue, rejectWithValue }
  ) => {
    const res = await authAPI.changePassword(payload)

    if (res.success) {
      return fulfillWithValue(res)
    } else {
      return rejectWithValue(res)
    }
  }
)

export const initPasswordAdminAction = createAsyncThunk(
  thunkActionType.INIT_PASSWORD_ADMIN_ACTION,
  async (payload: IResetPassword, { fulfillWithValue }) => {
    const res = await authAPI.initPasswordAdmin(payload)
    if (res.success) {
      return fulfillWithValue(res)
    }
    return fulfillWithValue(null)
  }
)

export const getProfileAdminAction = createAsyncThunk(
  thunkActionType.GET_PROFILE_ADMIN_ACTION,
  async (_, { fulfillWithValue }) => {
    const res = await profileAPI.getAdminProfile()
    return res
  }
)

export const updateProfileAdminAction = createAsyncThunk(
  thunkActionType.UPDATE_PROFILE_ADMIN_ACTION,
  async (payload: any, { fulfillWithValue }) => {
    const res = await profileAPI.updateAdminProfile(payload)
    if (res.success) {
      return res
    }
    return fulfillWithValue(null)
  }
)
