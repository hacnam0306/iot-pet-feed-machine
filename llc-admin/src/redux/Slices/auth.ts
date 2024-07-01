import { createSlice } from '@reduxjs/toolkit'

import { IMerchantInfo, IProfile } from '@interfaces'
import { RootState } from '.'
import {
  forgotPasswordAction,
  getProfileAdminAction,
  initPasswordAdminAction,
  loginAction,
  resendCodeAction,
  resetPasswordAction,
  updateProfileAdminAction,
  verifyPasswordAction,
} from '../actions/auth'
import { thunkActionLoading } from '@configs'

interface IAuth {
  accessToken?: string
  accountInfo?: IProfile
  forgotEmail?: string
  code?: string
  loadings: Record<string, boolean | undefined>
  hash: string
  listDevices: any[]
  currentDevice: any
}

const initialState: IAuth = {
  accessToken: '',
  accountInfo: undefined,
  forgotEmail: undefined,
  code: undefined,
  loadings: {},
  hash: '',
  listDevices: [],
  currentDevice: undefined,
}

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload?.access_token
    },
    setDevice: (state, action) => {
      state.currentDevice = action.payload
    },
    logout: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.pending, (state) => {
      state.loadings[thunkActionLoading.LOGIN_ACTION_LOADING] = true
    })
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.LOGIN_ACTION_LOADING] = false
      state.accessToken = action.payload?.token
      state.accountInfo = action.payload
    })
    builder.addCase(loginAction.rejected, (state) => {
      state.loadings[thunkActionLoading.LOGIN_ACTION_LOADING] = false
      state.accessToken = ''
    })
    builder.addCase(forgotPasswordAction.pending, (state) => {
      state.loadings[thunkActionLoading.FORGOT_PASSWORD_ACTION_LOADING] = true
    })
    builder.addCase(forgotPasswordAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.FORGOT_PASSWORD_ACTION_LOADING] = false
      state.forgotEmail = action.payload?.data.email
      const hash = action.payload?.data?.data
      state.hash = hash
    })
    builder.addCase(forgotPasswordAction.rejected, (state) => {
      state.loadings[thunkActionLoading.FORGOT_PASSWORD_ACTION_LOADING] = false
    })

    builder.addCase(verifyPasswordAction.pending, (state) => {
      state.loadings[thunkActionLoading.VERIFY_PASSWORD_ACTION_LOADING] = true
    })
    builder.addCase(verifyPasswordAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.VERIFY_PASSWORD_ACTION_LOADING] = false
      state.hash = action.payload?.data?.data ?? ''
    })
    builder.addCase(verifyPasswordAction.rejected, (state) => {
      state.loadings[thunkActionLoading.VERIFY_PASSWORD_ACTION_LOADING] = false
    })

    builder.addCase(resendCodeAction.pending, (state) => {
      state.loadings[thunkActionLoading.RESEND_CODE_ACTION_LOADING] = true
    })
    builder.addCase(resendCodeAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.RESEND_CODE_ACTION_LOADING] = false
      state.hash = action.payload?.data?.data ?? ''
    })
    builder.addCase(resendCodeAction.rejected, (state) => {
      state.loadings[thunkActionLoading.RESEND_CODE_ACTION_LOADING] = false
    })

    builder.addCase(resetPasswordAction.pending, (state) => {
      state.loadings[thunkActionLoading.RESET_PASSWORD_ACTION_LOADING] = true
    })
    builder.addCase(resetPasswordAction.fulfilled, (state) => {
      state.loadings[thunkActionLoading.RESET_PASSWORD_ACTION_LOADING] = false
      state.forgotEmail = undefined
      state.code = undefined
      state.hash = ''
    })
    builder.addCase(resetPasswordAction.rejected, (state) => {
      state.loadings[thunkActionLoading.RESET_PASSWORD_ACTION_LOADING] = false
    })
    builder.addCase(initPasswordAdminAction.pending, (state) => {
      state.loadings[thunkActionLoading.INIT_PASSWORD_ADMIN_ACTION_LOADING] =
        true
    })
    builder.addCase(initPasswordAdminAction.fulfilled, (state) => {
      state.loadings[thunkActionLoading.INIT_PASSWORD_ADMIN_ACTION_LOADING] =
        false
    })
    builder.addCase(initPasswordAdminAction.rejected, (state) => {
      state.loadings[thunkActionLoading.INIT_PASSWORD_ADMIN_ACTION_LOADING] =
        false
    })
    builder.addCase(getProfileAdminAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PROFILE_ADMIN_LOADING] = true
    })
    builder.addCase(getProfileAdminAction.fulfilled, (state, action: any) => {
      state.loadings[thunkActionLoading.GET_PROFILE_ADMIN_LOADING] = false
      state.listDevices = action.payload?.devices
    })
    builder.addCase(getProfileAdminAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PROFILE_ADMIN_LOADING] = false
    })
    builder.addCase(updateProfileAdminAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_PROFILE_ADMIN_LOADING] = true
    })
    builder.addCase(updateProfileAdminAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_PROFILE_ADMIN_LOADING] = false
      state.accountInfo = action.payload?.data?.user
    })
    builder.addCase(updateProfileAdminAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_PROFILE_ADMIN_LOADING] = false
    })
  },
})

export const authActions = {
  ...authSlice.actions,
}

export const selectAuth = (state: RootState) => state.auth
export const selectAuthLoading = (state: RootState, name: string) =>
  state.auth.loadings[`${name}Loading`]

export default authSlice.reducer
