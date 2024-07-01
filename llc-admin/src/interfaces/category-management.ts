import { Media } from './aboutus-management'

export interface ICategory {
  parentCategoryId: number
  parentCategory?: string
  metaData: {
    metaTitle: string
    metaDescription: string
    keywords: string
    canonical: string
    schemaMarkup: string
    metaImage: string
  }
  id: number
  name: string
  nameInDutch: string
  slug: string
  createdAt: Date
  updatedAt: Date
  subCategories: ISubCategory[]
  media: Media
  mediaId: number
}

export interface ISubCategory {
  id: number
  categoryId?: number
  name: string
  createdAt: Date
  updatedAt: Date
  slug: string
}

export interface IGetCategoriesSuccessData {
  data: ICategory[]
}
