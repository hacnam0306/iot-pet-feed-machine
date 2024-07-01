import { ISeoMetaData } from './aboutus-management'
import { IPhotoMedia } from './user-management'

export interface IAboutUsDetail {
  id: number
  no: number
  name: string
  title: string
  content: string
  milestone: null
  type: string
  mediaId: number
  mediaMobileId: number
  mediaDescription: string
  createdAt: Date
  updatedAt: Date
  media: IPhotoMedia
  mediaMobile: IPhotoMedia
  nameInDutch: string
  titleInDutch: string
  contentInDutch: string
  mediaDescriptionInDutch: string
  metaData: {
    textColor: string
  }
}

export interface IAddAboutUsRequest {
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number | null
  mediaMobileId: number | null
  mediaDescription: string
  mediaDescriptionInDutch: string
  textColor: string
}

export interface IMotiveRequest {
  no: number
  // title: string
  // titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number | null
  mediaMobileId: number | null
}
export interface IRoadMapDetail {
  id: number
  no: number
  name: string
  title: string
  content: string
  milestone: string
  type: string
  mediaId: number
  mediaMobileId: number
  mediaDescription: null
  createdAt: Date
  updatedAt: Date
  media: IPhotoMedia
  mediaMobile: IPhotoMedia
  nameInDutch: string
  titleInDutch: string
  contentInDutch: string
  mediaDescriptionInDutch: string
}

export interface IQuoteDetail {
  id: number
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  milestone: string
  type: string
  mediaId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  createdAt: string
  updatedAt: string
}

export interface IAddRoadMapRequest {
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  milestone: string
  content: string
  contentInDutch: string
  mediaId: number | null

  mediaMobileId: number | null
}

export interface IUploadHomepageVideoRequest {
  mediaId: number
  mediaMobileId: number
}

export interface IHomepageVideoDetail {
  id: number
  type: 'HOMEPAGE_VIDEO'
  mediaId: number
  mediaMobileId: number
  createdAt: string
  updatedAt: string
  media: IPhotoMedia
  mediaMobile: IPhotoMedia
}

export interface IAddQuoteRequest {
  no: number
  name: string
  content: string
  contentInDutch: string
}

export interface IUpdateCommunityRequest {
  mediaId: number
  mediaMobileId: number
  appleStoreLink: string
  playStoreLink: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  textColor: string
}

export interface ICommunityDetail {
  id: number
  type: 'COMMUNITY'
  mediaId: 326
  mediaMobileId: number
  mediaDescription: null
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  metaData: {
    playStoreLink: string
    appleStoreLink: string
    textColor: string
    buttonInDutch?: string
    button?: string
    buttonLink?: string
  }
  createdAt: string
  updatedAt: string
  media: IPhotoMedia
  mediaMobile: IPhotoMedia
}

export interface IUpdateContactRequest {
  content: string
  contentInDutch: string
  phoneNumber: string
  email: string
  address: string
  facebookLink: string
  instagramLink: string
  linkedinLink: string
  tiktokLink: string
}
export interface ITermAndPolicyDetail {
  id: number
  content: string
  type: string
  metaData: MetaData
  updatedAt: Date
  createdAt: Date
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  subContent: string
  contentInDutch: string
  subContentInDutch: string
  milestone: string
  mediaId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  mediaTitle: string
  mediaTitleInDutch: string
}

export interface MetaData {
  urlSlug: string
  metaImage: string
  keywords: string
  keywordsInDutch: string
  metaTitle: string
  metaTitleInDutch: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  metaDescriptionInDutch: string
}

export interface ITermAndPoliciesFormData {
  urlSlug: string
  content: string
  contentInDutch: string
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  keywords: string
  metaImage: string
}

export interface IHomeSeoDetail {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  keywords: string
  metaImage: string
}

export interface IBlogSeoData extends ISeoMetaData {
  description: string
  descriptionInDutch: string
}
