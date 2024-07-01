import { ProfilePhoto } from './auth'

export interface UserItem {
  id: number
  salesforceId: string
  firstName: string
  lastName: string
  email: string
  mobile: string
  gender: string
  avatarUrl: string
  occupation: string
  mailingCity: string
  role: string
  status: string
  createdAt: string
  updatedAt: string
}

export interface AdminProfile {
  id: number
  profilePhotoId: string
  roleId: string
  rankId: string
  email: string
  firebaseId: string
  password: string
  phone: string
  name: string
  username: string
  address: string
  loyaltyPoint: number
  refreshToken: string
  isActive: boolean
  client: string
  createdAt: string
  updatedAt: string
}

export interface IProfile {
  id: number
  _id: string
  stripeCustomerId: number
  profilePhotoId: number
  roleId: number
  rankId: number
  email: string
  firebaseId: number
  phone: string
  name: string
  username: string
  description: string
  loyaltyPoint: number
  status: string
  isActive: boolean
  lastActiveTime: string
  deviceName: string
  client: string
  paymentMethodIds: string[]
  createdAt: string
  updatedAt: string
  deletedAt: string
  profilePhoto: ProfilePhoto
  packages: any[]
  role: Role
  isLoginSocial: boolean
}

export interface Role {
  id: number
  name: string
  isDefault: boolean
  permissionIds: any[]
  isAdmin: boolean
  createdAt: string
  updatedAt: string
  permissions: any[]
}

export interface IChangeProfileData {
  name: string
  profilePhotoId: number
  phone: string
  email: string
  access_type: string
  role: string
  description: string
}
