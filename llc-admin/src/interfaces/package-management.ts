import { EPackagePrivacy } from 'src/configs'
import { ICommonGetParams, ICommonGetSuccess } from './app'
import { IMediaItem } from './gallery'

export interface IPackageBenefitsModule {
  module: string
  packageBenefits: IPackageBenefits[]
}

export interface IPackageBenefits {
  id: number
  name: string
  slug: string
  module: string
  createdAt: string
  updatedAt: string
}
interface InputValues {
  [key: string]:
    | string
    | {
        discount: number | string
      }
}
export interface IPackageParams extends ICommonGetParams {}

export interface IGetPackageSuccessData extends ICommonGetSuccess {
  items: IPackage[]
}

export interface IPackage {
  id?: number
  name?: string
  nameInDutch?: string
  priceUsd?: number | string
  priceEur?: number | string
  isDefault?: boolean
  isActive?: boolean
  packageBenefitIds?: number[]
  packageBenefitItems?: any
  mediaId?: number
  media?: IMediaItem
  createdAt?: string
  updatedAt?: string
  backgroundColor?: string
  textColor?: string
  type?: EPackagePrivacy
}

export interface ICreatePackageSuccessData {
  package: IPackage
  message: string
}
