export enum EMediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  ALL = 'ALL',
}

export enum EMediaCategory {
  HOME_PAGE = 'HOME_PAGE',
  ABOUT_US = 'ABOUT_US',
  BLOG = 'BLOG',
  CONTACT_US = 'CONTACT_US',
  CHAT_CHANNEL = 'CHAT_CHANNEL',
  PACKAGE = 'PACKAGE',
  PROFILE = 'PROFILE',
  COURSE = 'COURSE',
}

export interface IMediaItem {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  category: string
  createdAt: string
  updatedAt: string
  baseUrl: string
  signedUrl: string
  name: string
  url?: string
}

export interface IResponseGetMedia {
  items: IMediaItem[]
  total: number
  page: number
  limit: number
}

export interface IRequestGetMedia {
  type: EMediaType
  category: EMediaCategory
}
