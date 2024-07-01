import { IMediaItem } from './gallery'

export type TGetEmailContentsParams = {
  page?: number
  limit?: number
  search?: string
  status?: boolean
  type?: string
  groupId?: number
}

export interface IEmailContentItem {
  id: number
  title: string
  content: string
  type: string
  groupId: number
  status: boolean
  mediaId?: number | null
  createdAt: string
  updatedAt: string
  group: Group
  media: IMediaItem
}

export type IEmailContentForm = Pick<
  IEmailContentItem,
  'title' | 'content' | 'type' | 'groupId' | 'status' | 'mediaId'
>

export interface Group {
  id: number
  name: string
}

export interface IGetEmailContentsResponse {
  items: IEmailContentItem[]
  total: number
  page: number
  limit: number
}
