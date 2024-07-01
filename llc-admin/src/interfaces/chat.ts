export interface ICMedia {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export interface ICUser {
  id: number
  profilePhotoId: number
  profilePhoto: ICMedia
}
export interface ICMessageItem {
  id: number
  type: string
  isMe: boolean
  content: string | null
  createdAt?: string
  isRead: boolean
  mediaId: number | null
  roomId: number
  media: ICMedia | null
  user: ICUser
}

export interface IUserChat {
  id: number
  profilePhotoId: null
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
  lastActiveTime: null
  deviceName: null
  client: string
  createdAt: string
  updatedAt: string
  deletedAt: null
  role: Role
  url?: string
}

export interface Role {
  id: number
  name: string
  isDefault: boolean
  permissionIds: any[]
  isAdmin: boolean
  createdAt: string
  updatedAt: string
}

export interface IResponseFetchAllUserChat {
  items: IUserChat[]
  total: number
  limit: number
  page: number
}

export interface IResponseCreateChatRoom {
  id: number
  name: string
  image: string
  createdAt: string
  updatedAt: string
}

export interface IItemInListChatRoom {
  id: number
  name: string
  image: string
  updatedAt: string
  createdAt: string
  participants: Participants
  isRead: boolean
  unReadNumbers: number

  lastMessage: LastMessage
}

export interface LastMessage {
  userId: number
  roomId: number
  type: string
  content: string
  mediaId: number
  isRead: boolean
  createdAt: string
  updatedAt: string
  user: Participants
}

export interface Participants {
  id: number
  name: string
  profilePhotoId: number
  profilePhoto: ProfilePhoto
  url?: string
  UserRoom?: UserRoom
}

export interface UserRoom {
  userId: number
  roomId: number
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface ProfilePhoto {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: Date
  updatedAt: Date
}

export interface IResponseGetMessages {
  items: ICMessageItem[]
  total: number
  limit: number
  page: number
}
