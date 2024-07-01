import { ICommonGetParams, ICommonGetSuccess } from './app'
import { ISubCategory } from './category-management'

export interface IBlogParams extends ICommonGetParams {
  status?: string | number
}

export interface IGetBlogSuccessData extends ICommonGetSuccess {
  items: IBlogNewsItem[]
}

export interface IBlogNewsItem {
  id?: number
  title: string
  postDate: Date
  published: boolean
  showAuthorName: boolean
  authorId: number
  type: string
  author: Author
  thumbnail: Thumbnail
}

export interface Author {
  id: number
  username: string
  email: string
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

export interface IAddNewBlog {
  title: string
  content: string
  caption: string
  authorId: number
  mediaIds: number[]
  published: boolean
  showAuthorName: boolean
  tagIds: number[]
  urlSlug: string
  metaTitle: string
  metaDescription: string
  metaImage: string
  postDate: string
  keywords: string
  type: string
  language: string
  thumbnailId: number
}

export interface IAddNewBlogValue {
  title: string
  content: string
  urlSlug: string
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  metaImage: string
  keywords: string
  authorId: number
  postDate: string
  categoriesIds: number[]
  tagsIds: number[]
  type: string
  published: boolean
  showAuthorName: boolean
  thumbnailId: number
  language: string
  isDiscover?: boolean
}

export interface IResponseCreateBlog {
  id: number
  title: string
  content: string
  authorId: number
  tagIds: number[]
  published: boolean
  showAuthorName: boolean
  metaData: MetaData
  postDate: Date
  keywords: string[]
  type: string
  language: string
  thumbnailId: number
  createdAt: string
  updatedAt: string
  author: Author
  thumbnail: Thumbnail
  tags: Category[]
  categories: Category[]
}

export interface Author {
  id: number
  username: string
  email: string
}

export interface Category {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  categoryId?: number
}

export interface MetaData {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  metaImage: string
  keywords: string
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

export interface IResponseGetBlogDetail {
  id: number
  title: string
  content: string
  authorId: number
  tagIds: number[]
  published: boolean
  showAuthorName: boolean
  metaData: MetaData
  postDate: string
  keywords: string
  type: string
  language: string
  thumbnailId: number
  createdAt: string
  updatedAt: string
  author: Author
  thumbnail: Thumbnail
  tags: ISubCategory[]
  categories: Category[]
  isDiscover?: boolean
}

export interface Author {
  id: number
  username: string
  email: string
}

export interface MetaData {
  urlSlug: string
  metaTitle: string
  metaDescription: string
  canonical: string
  schemaMarkup: string
  metaImage: string
}
