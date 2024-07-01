import { ECommonContentLayout } from '@configs'

export interface IDataBannerTab {
  title: string
  titleInDutch: string
  mediaId: number
  mediaMobileId: number
  textColor: string
  layout?: ECommonContentLayout
  mediaDescription?: string
  mediaDescriptionInDutch?: string
}

export interface IDataCommunityTab {
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
  buttonInDutch: string
  button: string
  buttonLink: string
}

export interface IDataMotiveTab {
  // title: string
  // titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
}

export interface IMotiveItem {
  id: number
  no: number
  name: string | null
  nameInDutch: string | null
  title: string | null
  titleInDutch: string | null
  content: string | null
  subContent: string | null
  contentInDutch: string | null
  subContentInDutch: string | null
  milestone: string | null
  type: string | null
  mediaId: number | null
  mediaMobileId: number | null
  mediaDescription: string | null
  mediaDescriptionInDutch: string | null
  metaData: string | null
  mediaTitle: string | null
  createdAt: string
  updatedAt: string
  media: Media
  mediaMobile: Media
}

export interface Media {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  category: null | string
  createdAt: string
  updatedAt: string
  url: string
}

export interface IDataMemberTab {
  title: string
  titleInDutch: string
  content: string
  contentInDutch: string
  mediaId: number
  mediaMobileId: number
}

export interface IMemberItem extends IMotiveItem {}

export interface IResponseBenefit {
  packageBenefit: PackageBenefit
  message: string
}

export type IRequestBenefit = Pick<PackageBenefit, 'title' | 'titleInDutch'> & {
  benefits: MetaDaBenefit[]
}

export interface PackageBenefit {
  id: number
  title: string
  titleInDutch: string
  type: string
  metaData: MetaDaBenefit[]
  updatedAt: Date
  createdAt: Date
  no: string | null
  name: string | null
  nameInDutch: string | null
  content: string | null
  subContent: string | null
  contentInDutch: string | null
  subContentInDutch: string | null
  milestone: string | null
  mediaId: string | null
  mediaMobileId: string | null
  mediaDescription: string | null
  mediaDescriptionInDutch: string | null
  mediaTitle: string | null
}

export interface MetaDaBenefit {
  mediaId: number
  mediaMobileId?: number
  content: string
  contentInDutch: string
  media?: Media
  mediaMobile?: Media
}
