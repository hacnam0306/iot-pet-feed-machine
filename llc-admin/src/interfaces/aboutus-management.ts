//////Providing

import { IMediaTitle } from './media'
import { IPhotoMedia } from './user-management'

export interface IMetaDataCommonContent {
  playStoreLink: string
  appleStoreLink: string
  website: string
  facebookLink: string
  instagramLink: string
}
export interface ICommonContentDetail {
  id: number
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  subContent: string
  subContentInDutch: string
  milestone: string
  type: string
  mediaId: number
  mediaMobileId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: IMetaDataCommonContent
  mediaTitle: IMediaTitle[]
  createdAt: string
  updatedAt: string
  media: IPhotoMedia
  mediaMobile: IPhotoMedia
}

export interface IContactData {
  id: number
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  subContent: string
  contentInDutch: string
  subContentInDutch: string
  milestone: string
  type: string
  mediaId: string
  mediaMobileId: string
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: MetaDataContact
  mediaTitle: string
  createdAt: string
  updatedAt: string
}

export interface MetaDataContact {
  email: string
  address: string
  phoneNumber: string
  facebookLink: string
  instagramLink: string
  linkedinLink: string
  tiktokLink: string
}

export interface IProvidingDetail {}

export interface IAddProvidingRequest {
  no?: number
  title?: string
  titleInDutch?: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
  mediaTitle?: number[]
  author?: string
  authorTitle?: string
  authorTitleInDutch?: string
}
export interface IHomeContentRequest {
  no: number
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
  buttonInDutch: string
  button: string
  buttonLink: string
  buttonInDutch2?: string
  button2?: string
  buttonLink2?: string
}
export interface IHomePositionContent {
  no: number
  id: number
}

export interface IAddProvidingResponse {}

// Landing

export interface ILandingFormData {
  mediaId: number
  mediaMobileId: number
  mediaDescription: string
  title: string
  titleInDutch: string
  mediaDescriptionInDutch: string
  textColor: string
  layout: string
}

export interface IAddLandingParams extends ILandingFormData {}

export interface IResponseCreateLanding {
  aboutUsLanding: AboutUsLanding
}

export interface AboutUsLanding {
  id: number
  mediaId: number
  mediaMobileId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  type: string
  updatedAt: string
  createdAt: string
  no: string
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  milestone: string
  metaData: {
    layout: any
    textColor: string
  }
  mediaTitle: string
  media: Media
  mediaMobile: Media
}

export interface Media {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export interface IResponseGetLanding {
  id: number
  no: string
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  milestone: string
  type: string
  mediaId: number
  mediaMobileId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: {
    textColor: string
    layout: string
  }
  mediaTitle: string
  createdAt: string
  updatedAt: string
  media: Media
  mediaMobile: Media
}

// Our Story

export interface IOurStoryFormData {
  no?: number
  title?: string
  titleInDutch?: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
  author?: string
  authorTitle?: string
  authorTitleInDutch?: string
}

export interface IOurVisionFormData {
  content: string
  contentInDutch: string
  title: string
  titleInDutch: string
  mediaId: number
  mediaMobileId: number
}

export interface IOurStoryItem {
  id: number
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  milestone?: string
  type: string
  mediaId: string
  mediaMobileId: string
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: any
  mediaTitle: string
  createdAt: string
  updatedAt: string
  media: Media
  mediaMobile: Media
  author: string
  authorTitle: string
  authorTitleInDutch: string
}

export interface IResponseCreateAndUpdateOurStory {
  aboutUsOurStory: IOurStoryItem
  message: string
}

////Simple Quote
export interface IAddSimpleQuoteRequest {
  no: number
  content: string
  contentInDutch: string
  subContent: string
  subContentInDutch: string
  mediaId: number
}

////CEO Quotes
export interface IAddCEOQuotesRequest {
  no?: number
  name: string
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId?: number
}

// Core value

export type ICoreValueFormData = Omit<IAddProvidingRequest, 'mediaTitle'>

export interface IHomeSEODetail {
  id: number
  no: number
  name: string
  nameInDutch: string
  title: string
  titleInDutch: string
  content: string
  subContent: string
  contentInDutch: string
  subContentInDutch: string
  milestone: string
  type: string
  mediaId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: MetaDataCommonContent
  mediaTitle: string
  createdAt: string
  updatedAt: string
}

export interface MetaDataCommonContent {
  urlSlug: string
  keywords: string
  metaImage: string
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
}

export interface ISeoMetaData {
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  metaImage: string
  keywords: string
}

export interface IAboutUsPageSeo extends ISeoMetaData {}

export interface IAddUpdateAboutUsPageSeoResponse {
  seoAboutUs: SEOAboutUs
  message: string
}

export interface SEOAboutUs {
  id: number
  no: number
  name: string
  title: string
  content: string
  milestone: string
  type: string
  nameInDutch: string
  titleInDutch: string
  subContent: string
  contentInDutch: string
  subContentInDutch: string
  mediaId: number
  mediaDescription: string
  mediaDescriptionInDutch: string
  metaData: IAboutUsPageSeo
  mediaTitle: string
  createdAt: string
  updatedAt: string
}

export interface HomePageContent {
  id: number
  no: number
  name: null
  nameInDutch: null
  title: string
  titleInDutch: string
  content: string
  subContent: null
  contentInDutch: string
  subContentInDutch: null
  milestone: null
  type: string
  mediaId: number
  mediaMobileId: number
  mediaDescription: null
  mediaDescriptionInDutch: null
  metaData: MetaData
  mediaTitle: null
  createdAt: Date
  updatedAt: Date
  media: Media
  mediaMobile: Media
  buttonLink: string
  button: string
  buttonInDutch: string
}

export interface MetaData {
  button: string
  buttonLink: string
  buttonInDutch: string

  button2?: string
  buttonLink2?: string
  buttonInDutch2?: string
}
