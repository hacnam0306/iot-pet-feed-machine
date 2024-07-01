import { EPlanViewType, enumNavKey } from '@configs'
import { AxiosError } from 'axios'

export interface IGetParams {
  page?: string | number
  size?: string | number
}
export interface BaseResponseProps<TData = any> {
  code: number
  data: TData
  errors?: any
  messages?: string
  message?: string
  success: boolean
  total?: number
}

export interface BaseResponseError extends AxiosError {
  errors: string | string[]
  success: boolean
}

export interface IGetRoot {
  success: boolean
  code: number
  message: string
}

export interface IGetListParams {
  num?: number
  limit?: number
  page: number
  title?: string
}
export type DropdownProps = Array<{ value: string | number; label: string }>
export interface FilterDataItem {
  value: string | number
  label: string
}

export interface SideBarData {
  label: string
  path: string
  pathKey: enumNavKey
  subItems?: SubSideBar[]
}
export interface SubSideBar {
  label: string
  path: string
  pathKey: enumNavKey
  subOptions?: any[]
}
export type RouterParams = {
  planDetail: {
    type: EPlanViewType
  }
  UserDetailPage: {
    userId: string
  }
  UserDetail: {
    userId: string
  }
  NotificationEditPage: {
    notificationId: string
  }
  ChatDetail: {
    chatId: string
  }
  BlogDetail: {
    blogId: string
  }
  CourseDetail: {
    courseId: string
  }
  LessonDetail: {
    lessonId: string
  }
  PostDetail: {
    postId: string
  }
  GroupUserDetail: {
    groupId: string
  }

  EmailContentDetail: {
    emailContentId: string
  }

  RoutineDetail: {
    routineId: string
  }
}

export interface ICommonGetParams {
  page?: number
  limit?: number
  search?: string
  sort?: { [key: string]: any }
}

export interface ICommonGetSuccess {
  total: number
  page: string
  limit: string
}

export enum ETransactionType {
  MEMBERSHIP = 'MEMBERSHIP',
  ORDER = 'ORDER',
  RETREAT_BOOKING = 'RETREAT_BOOKING',
  COURSE = 'COURSE',
}

export const TransactionTypeContent: { [key: string]: string } = {
  [ETransactionType.MEMBERSHIP]: 'Membership payment',
  [ETransactionType.ORDER]: 'Order purchase',
  [ETransactionType.RETREAT_BOOKING]: 'Retreat booking',
  [ETransactionType.COURSE]: 'Course purchase',
}

export enum ETransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export const TransactionStatusContent: { [key: string]: string } = {
  [ETransactionStatus.PENDING]: 'Pending',
  [ETransactionStatus.SUCCESS]: 'Complete',
  [ETransactionStatus.FAILED]: 'Failed',
}
