import { ECurrency, EUserGender } from '@configs'
import { ETransactionStatus, ETransactionType, IGetParams } from './app'
import { ILoginResponse } from './auth'
import { IRole } from './role-management'

export interface IFetchUsersParams extends IGetParams {
  sortOption?: string
  search?: string
  limit?: string | number
}

export interface IFetchUsersSuccessData {
  result: IUserDetail[]
  totalItems?: number | string
  currentPage?: number | string
  totalPage?: number | string
}

export interface IResponseFetchAllUsers {
  items: ILoginResponse[]
  limit: number
  page: number
  total: number
}

export type TUpdateUserData = Partial<IUserDetail>

export type TDeleteUserData = Partial<IUserDetail> & { isSoft: boolean }

export interface IPhotoMedia {
  id: number
  uploaderId: string
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export type TPackageSubcribed = {
  id: number
  userId: number
  packageId: number
  dueDate: string
  isActive: boolean
  isAutoRenew?: boolean
  createdAt: string
  updatedAt: string
}

export type TPackage = {
  id: number
  name: string
  priceUsd: number
  priceEur: number | null
  yearlyPriceEur: number | null
  yearlyPriceUsd: number | null
  isDefault: boolean
  isActive: boolean
  isSubscribed?: boolean
  packageBenefitIds: number[]
  createdAt: string
  updatedAt: string
  deletedAt?: string | null
  packageSubscribed?: TPackageSubcribed
  PackagesSubscribed?: TPackageSubcribed
  currency: string
  backgroundColor?: string
  textColor?: string
}

export interface IUserDetail {
  id: number
  profilePhotoId: string
  roleId: number
  rankId: number
  email: string
  firebaseId: string
  phone: string
  name: string
  username: string
  address: string
  loyaltyPoint: number
  refreshToken: string
  isActive: boolean
  status: string
  createdAt: Date
  updatedAt: Date
  deletedAt: string
  role?: IRole
  profilePhoto?: IPhotoMedia
  packageId?: number
  packages: TPackage[]
}

export interface IUserReport {
  _id: string
  date?: string
  avgRate?: number
  maxRate?: number
  minRate?: number
  stepCount?: number
  trainingTime?: number
}

export interface IUserData {
  age?: number
  gender?: EUserGender
  sickness: string[]
  betaBlocker?: string
  diseaseName?: string
  atrialFibrillation?: string
  baseMaker?: string
  note?: string
  pacingPulse?: number
  vtPulse?: number
}

export interface IEditUserData {
  name?: string
  email?: string
  gender?: EUserGender
  sickness?: string[]
  age?: number
  betaBlocker?: string
  atrialFibrillation?: string
  baseMaker?: string
  note?: string
  vtPulse?: number
  pacingPulse?: number
  isActive?: boolean
}

export interface ITransaction {
  id: number
  userId: number
  title: string
  type: ETransactionType
  transactionId: string
  status: ETransactionStatus
  amount: number
  currency: ECurrency
  entityId: number
  createdAt: string
  updatedAt: string
}
