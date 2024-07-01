import { IPhotoMedia } from './user-management'

export interface IUploadMediaResponse {
  dataValues: IPhotoMedia
  _previousDataValues: IPhotoMedia
  uniqno: number
  _changed: object
  _options: {
    isNewRecord: boolean
    _schema: string
    _schemaDelimiter: string
  }
  isNewRecord: boolean
  url: string
  message: string
  baseUrl?: string
  original?: string
  id: number
}

export interface IMediaTitle {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url?: string
}

export interface IMediaTitle {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url?: string
}
