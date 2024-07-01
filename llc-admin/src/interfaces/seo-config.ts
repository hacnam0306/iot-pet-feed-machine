import { intersection } from 'lodash'

export interface ISeoConfigDetail {
  id: number
  courseId: number
  metaTitle: string
  metaDescription: string
  keywords: string
  canonical: string
  metaImage: string
  createdAt: string
  updatedAt: string
}

export interface IUpdateSeoConfig {
  id: number
  metaData: {
    metaTitle: string
    metaDescription: string
    keywords: string
    canonical: string
    metaImage: string
  }
}

export interface IPayloadSeoConfig {
  metaTitle: string
  metaDescription: string
  keywords: string
  canonical: string
  metaImage: string
}

export interface MetaData {
  metaTitle: string
  metaDescription: string
  keywords: string
  canonical: string
  metaImage: string
}

export interface IResponseUpdateSeoConfig {
  id: number
  courseId: number
  metaData: MetaData
  createdAt: string
  updatedAt: string
}

export interface IResponseDetailSeoConfig {
  metaData: MetaData
}
