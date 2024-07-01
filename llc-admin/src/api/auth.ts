import { EAuthType, EForgotPasswordPageType } from '@configs'
import {
  IChangePasswordFields,
  ICommonDataResponse,
  ILoginFields,
  ILoginRequest,
  ILoginResponse,
  IResendCode,
  IResetPassword,
  IUserResponseLogin,
  IVerifyForgotPassword,
} from '@interfaces'
import { ApiClient } from './axiosClient'

const baseEndPoint = '/users'

export const authAPI = {
  login: (values: ILoginRequest) => {
    return ApiClient.post<IUserResponseLogin, ILoginRequest>(
      `${baseEndPoint}/${EAuthType.LOGIN}`,
      values
    )
  },
  forgotPassword: (values: ILoginFields) => {
    return ApiClient.post<ILoginResponse, ILoginFields>(
      `${baseEndPoint}/${EForgotPasswordPageType.FORGOT_PASSWORD}`,
      values
    )
  },
  verifyPassword: (values: IVerifyForgotPassword) => {
    return ApiClient.post<ICommonDataResponse, IVerifyForgotPassword>(
      `${baseEndPoint}/${EForgotPasswordPageType.VERIFY_FORGOT_PASSWORD}`,
      values
    )
  },

  resendCode: (values: IResendCode) => {
    return ApiClient.post<ICommonDataResponse, IResendCode>(
      `${baseEndPoint}/${EForgotPasswordPageType.RESEND_CODE}`,
      values
    )
  },

  resetPassword: (values: IResetPassword) => {
    return ApiClient.post<{}, IResetPassword>(
      `${baseEndPoint}/${EForgotPasswordPageType.RESET_PASSWORD}`,
      values
    )
  },
  changePassword: (values: IChangePasswordFields) => {
    return ApiClient.post<{}, IChangePasswordFields>(
      `${baseEndPoint}/change-password`,
      values
    )
  },
  initPasswordAdmin: (values: IResetPassword) => {
    return ApiClient.post<{}, IResetPassword>(
      `${baseEndPoint}/init-password-admin`,
      values
    )
  },
}
