import { ILoginResponse } from '@interfaces'

export interface ActivityLogItem {
  id: number
  userId: number
  action: string
  type: string
  adminTitle: string
  userTitle: string
  metaData: MetaData
  createdAt: Date
  updatedAt: Date
}

export interface MetaData {
  data: {
    deviceName?: string
    profilePhoto?: string
    currentData?: Partial<ILoginResponse>
    previousData?: Partial<ILoginResponse>
    changedObject?: {
      currentData?: Partial<ILoginResponse>
      previousData?: Partial<ILoginResponse>
    }
    user: {
      id: number
      name: string
      email: string
      username: string
      profilePhoto: string
    }
    post: { id: number }
  }
}

export interface IResponseFetchAllActivityLogs {
  items: ActivityLogItem[]
  total: number
  limit: number
  page: number
}

export interface IFetchUserLogByUserIdParams {
  id: string | number
  page: string | number
  limit: string | number
  search?: string
  type?: string
}
