import { ICommonGetParams, ICommonGetSuccess } from './app'

export interface ICourseParams extends ICommonGetParams {
  status?: string | number
  type?: string | number
}

export interface IGetCourseSuccessData extends ICommonGetSuccess {
  totalHighlight: number
  items: ICourseItem[]
}
export enum ELessonType {
  VIDEO = 'VIDEO',
  AUDIO = 'AUDIO',
  ASSIGNMENT_TEST = 'ASSIGNMENT_TEST',
  ASSIGNMENT_EXERCISE = 'ASSIGNMENT_EXERCISE',
  FINAL_TEST = 'FINAL_TEST',
}
export interface ICourseItem {
  id?: number
  title: string
  description: string
  userId: number
  type: string
  eurPrice: number
  usdPrice: number
  difficulty: string
  isActived: boolean
  isDrafted: boolean
  deletedAt: string
  isTrial: boolean
  thumbnailId: number
  demoVideoId: number
  hasCertificated: boolean
  user: User
  categories: Category[]
  thumbnail: Thumbnail
  isHighlighted: boolean
}

export interface User {
  id: number
  username: string
  email: string
  name: string
}

export interface Category {
  id: number
  name: string
}

export interface SubCategory {
  id: number
  name: string
}

export interface IResponseUploadThumbnail {
  dataValues: Thumbnail
  _previousDataValues: Thumbnail
  uniqno: number
  _changed: Changed
  _options: Options
  isNewRecord: boolean
  url: string
  baseUrl: string
  message: string
  id: number
  original?: string
}

export interface Changed {}

export interface Options {
  isNewRecord: boolean
  _schema: null
  _schemaDelimiter: string
}

export interface Thumbnail {
  id: number
  userId: number
  bucket: string
  path: string
  type: string
  createdAt: string
  updatedAt: string
  url: string
}

export interface IResponseGetCourseDetail {
  id?: number
  title: string
  description: string
  titleInDutch: string
  descriptionInDutch: string
  userId: number
  type: string
  eurPrice: number
  usdPrice: number
  difficulty: string
  isActived: boolean
  isDrafted: boolean
  isTrial: boolean
  thumbnailId: number
  demoVideoId: number
  hasCertificated: boolean
  user: User
  categories: Category[]
  subCategories: Category[]
  thumbnail: Thumbnail
  demoVideo: Thumbnail
  seoConfig: SeoConfig
}

export interface SeoConfig {
  slug: string
}

export interface IAddNewCourse {
  title: string
  description: string
  titleInDutch: string
  descriptionInDutch: string
  userId: number | undefined
  type: string
  eurPrice: number
  usdPrice: number
  difficulty: string
  isActived?: boolean
  isDrafted?: boolean
  // isTrial: boolean
  thumbnailId: number
  demoVideoId: number
  // hasCertificated: boolean
  user: User
  categories: Category[]
  subCategories: SubCategory[]
  categoriesIds: number[]
  subCategoriesIds: number[]
  slug: string
}

export interface IResponseCreateCourse {
  id?: number
  title: string
  description: string
  userId: number
  type: string
  eurPrice: number
  usdPrice: number
  difficulty: string
  thumbnailId: number
  demoVideoId: number
  categories: Category[]
  subCategories: Category[]
  seoConfig: SeoConfig
  isActived?: boolean
  isDrafted?: boolean
}
export interface ILesson {
  id: number
  title: string
  type: ELessonType
  isTrial: boolean
}
export interface ICourseSections {
  title: string
  description: string
  titleInDutch: string
  descriptionInDutch: string
  id: number
  lessons: ILesson[]
}

export interface ICourseLessons {
  title: string
  description: string
  id: number
}
