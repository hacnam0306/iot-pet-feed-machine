import { ECallApiStatus, EUserPostStatus } from '../configs'

export type UserData = {
  id: number
  profilePhotoId?: number
  coverPhotoId?: number
  roleId: null
  rankId: null
  email: string
  firebaseId: null
  phone: null
  name: string
  username: string
  description: string
  loyaltyPoint: number
  isActive: boolean
  lastActiveTime: Date
  deviceName: string
  client: string
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  profilePhoto?: ImageData
  coverPhoto?: ImageData
  password: null
  personalizationBoard: boolean
  isLoginSocial: boolean
  friendsNumber: number
  requestsNumber: number
}

export type ImageData = {
  id: number
  uploaderId: number
  bucket: string
  path: string
  type: string
  updatedAt: Date
  createdAt: Date
  url?: string
  isNetwork?: boolean
}

export type TTag = {
  categoryId: number
  createdAt: string
  id: number
  name: string
  nameInDutch?: string | null
  slug: string
  updatedAt: string
}

export type TReaction = {
  id?: number
  userId: number
  userPostId?: number | null
  commentId?: number | null
  type: string
  createdAt?: string
  updatedAt?: string
} | null

export type TPostDetail = {
  author?: UserData
  authorId?: number
  content: string
  createdAt?: string
  id: number
  tempId?: number
  isActive?: boolean
  mediaIds?: number[]
  mediaLists?: ImageData[]
  sourceId?: number
  status?: EUserPostStatus
  tagIds?: number[]
  updatedAt?: string
  tags: TTag[]
  commentNumber: number
  reactionNumber: Record<string, number>
  reaction?: TReaction
  isPrivate?: boolean
  isShared?: boolean
  shareNumber?: number
  contentInDutch?: string
  published?: boolean
  publishedDate?: string
}

export type TCommentItem = {
  commentId?: number | null
  content?: string | null
  createdAt?: string
  id: number
  media?: ImageData
  mediaId: 2435
  reaction: TReaction
  repliedCommentNumber: number
  reactionNumber: Record<string, number>
  type: any
  updatedAt: string
  user: UserData
  userId: number
  userPostId: number
  isNew?: boolean
  status?: ECallApiStatus
}

export type TGetPostParams = {
  page?: number
  limit?: number
  search?: string
  tagId?: number
  status?: EUserPostStatus
  published?: string
}

export interface TGetPostSuccessData {
  items: TPostDetail[]
  limit: number
  page: number
  total: number
}

export interface IPostCreateForm {
  content: string
  contentInDutch: string
  tagIds: number[]
}

export interface IReplyForm {
  content: string
  mediaId?: number
}
