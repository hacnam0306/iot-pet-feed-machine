import { IProfile } from './user'

export interface ILoginSuccessData {
  access_token: {
    expires?: number
    token: string
  }
  data: {
    email: string
  }
}

export interface ILoginResponse {
  id: number
  profilePhotoId: string
  roleId: string
  rankId: string
  email: string
  firebaseId: string
  phone: string
  name: string
  username: string
  address: string
  loyaltyPoint: number
  refreshToken: string
  packages: {
    id: number
    name: string
    priceUsd: number
    yearlyPriceUsd: number
    priceEur: number
    yearlyPriceEur: number
    isDefault: boolean
    isActive: boolean
    packageBenefitIds: number[]
  }[]
  packageName: string
  dueDate: string
  price: number
  isActive: boolean
  status: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  token: {
    accessToken: string
    expires: number
    refreshToken: string
  }
  isNew: boolean
}

export interface ILoginFields {
  email?: string
  password?: string
}

export interface ILoginRequest extends ILoginFields {}

export interface IRegisterFields {
  email: string
  password: string
  name: string
  phone: string
  theme_color?: string
}

export interface ISendMailForgotFields {
  email: string
  hash: string
}

export interface IVerifyEmailFields {
  code: string
  email: string
}
export interface IVerifyForgotPassword {
  hash: string | undefined
  otpCode: string
}

export interface IResendCode {
  hash: string
  type: string
}

export interface IResetPassword {
  hash: string | undefined
  password: string
  confirmPassword: string
}

export interface IResetPasswordFields extends IVerifyEmailFields {
  newPassword: string
}
export interface IChangePasswordFields {
  oldPassword: string
  password: string
  confirmPassword: string
}

export interface ILogoutFields {
  accessToken?: string
}

export interface ILoginResFields {
  accessToken?: string
  merchantInfo?: IMerchantInfo
}
export interface ColorTheme {
  color: string
  font_size: number
  logo: string
}
export interface IMerchantInfo extends User {}

export interface ICommonDataResponse {
  data: string
  message: string
}

export interface IUserResponseLogin {
  user: IProfile
  token: Token
  message: string
}

export interface Token {
  accessToken: string
  refreshToken: string
}

export interface User {
  id: number
  profilePhotoId: number
  roleId: number
  rankId: null
  email: string
  firebaseId: null
  phone: string
  name: string
  username: null
  description: null
  loyaltyPoint: number
  status: string
  isActive: boolean
  lastActiveTime: string
  deviceName: null
  client: string
  createdAt: string
  updatedAt: string
  deletedAt: string
  profilePhoto: ProfilePhoto
  packages: { [key: string]: any[] | null | string }
  password: string
}

export interface ProfilePhoto {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export interface IResponseUploadFile {
  dataValues: DataValues
  _previousDataValues: DataValues
  uniqno: number
  _changed: Changed
  _options: Options
  isNewRecord: boolean
  url: string
  message: string
  id: number
}

export interface Changed {}

export interface Options {
  isNewRecord: boolean
  _schema: null
  _schemaDelimiter: string
}

export interface DataValues {
  userId: number
  bucket: string
  path: string
  type: string
  id: number
  createdAt: Date
  updatedAt: Date
}

export interface IResponseToggleReadState {
  userId: number
  roomId: number
  isRead: boolean
  createdAt: string
  updatedAt: string
}
