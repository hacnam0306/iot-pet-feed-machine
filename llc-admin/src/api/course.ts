import { Id } from '@reduxjs/toolkit/dist/tsHelpers'
import { objectToQueryString } from '@utils'
import { ApiClient } from 'src/api/axiosClient'
import {
  AboutUsLanding,
  IAddLandingParams,
  IAddUpdateAboutUsPageSeoResponse,
  IResponseGetLanding,
  ISeoMetaData,
} from 'src/interfaces/aboutus-management'
import {
  IAddNewCourse,
  ICourseParams,
  IGetCourseSuccessData,
  IResponseCreateCourse,
  IResponseGetCourseDetail,
  IResponseUploadThumbnail,
} from 'src/interfaces/course'

export const courseManagementAPI = {
  getListCourse: async (params: ICourseParams) => {
    return await ApiClient.get<IGetCourseSuccessData>('/courses', {
      params: {
        ...params,
        sort: objectToQueryString(params.sort || {}) || undefined,
      },
    })
  },

  uploadMedia: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await ApiClient.post<IResponseUploadThumbnail>(
      '/media/resize-resolution',
      formData
    )
  },
  getCoursePageSeo: async () => {
    return await ApiClient.get<ISeoMetaData>(`/common-contents/seo-academy`)
  },
  updateCoursePageSeo: async (data: Partial<ISeoMetaData>) => {
    return await ApiClient.post<IAddUpdateAboutUsPageSeoResponse>(
      `/common-contents/seo-academy`,
      data
    )
  },
  getCourseSection: async (courseId: number) => {
    return await ApiClient.get<any>(`/sections/course/${courseId}`)
  },

  addSections: async (data: {
    title: string
    description: string
    titleInDutch: string
    descriptionInDutch: string
    courseId: number
  }) => {
    return await ApiClient.post(`/sections`, data)
  },

  editSections: async (
    sectionId: number,
    data: {
      title: string
      description: string
      titleInDutch: string
      descriptionInDutch: string
    }
  ) => {
    return await ApiClient.put(`/sections/${sectionId}`, data)
  },
  getLanding: async () => {
    return await ApiClient.get<IResponseGetLanding>(
      `/common-contents/academy-banner`
    )
  },
  createLanding: async (params: IAddLandingParams) => {
    return await ApiClient.post<AboutUsLanding>(
      `/common-contents/academy-banner`,
      params
    )
  },
  deleteSections: async (id: number) => {
    return await ApiClient.delete(`/sections/${id}`)
  },

  addNewCourse: async (params: IAddNewCourse) => {
    return await ApiClient.post<IResponseCreateCourse>('/courses', {
      title: params.title,
      description: params.description,
      titleInDutch: params.titleInDutch,
      descriptionInDutch: params.descriptionInDutch,
      userId: params.userId,
      type: params.type,
      eurPrice: params.eurPrice,
      usdPrice: params.usdPrice,
      difficulty: params.difficulty,
      thumbnailId: params.thumbnailId,
      demoVideoId: params.demoVideoId,
      categoryIds: params.categoriesIds,
      subCategoryIds: params.subCategoriesIds,
      slug: params.slug,
    })
  },

  getCourseDetail: async (courseId: string) => {
    return await ApiClient.get<IResponseGetCourseDetail>(`/courses/${courseId}`)
  },

  updateCourseById: async (
    courseId: string | number,
    params: IAddNewCourse
  ) => {
    return await ApiClient.put<IResponseCreateCourse>(`/courses/${courseId}`, {
      title: params.title,
      description: params.description,
      titleInDutch: params.titleInDutch,
      descriptionInDutch: params.descriptionInDutch,
      userId: params.userId,
      type: params.type,
      eurPrice: params.eurPrice,
      usdPrice: params.usdPrice,
      difficulty: params.difficulty,
      thumbnailId: params.thumbnailId,
      demoVideoId: params.demoVideoId,
      categoryIds: params.categoriesIds,
      subCategoryIds: params.subCategoriesIds,
      isActived: params.isActived,
      isDrafted: params.isDrafted,
      slug: params.slug,
    })
  },

  deleteCourseById: async (courseId: string | number) => {
    return await ApiClient.delete(`/courses/${courseId}`)
  },
  highLightCourseId: async (courseId: string | number) => {
    return await ApiClient.put(`/courses/highlight/${courseId}`)
  },
  duplicateCourseById: async (courseId: string | number) => {
    return await ApiClient.post(`/courses/${courseId}`)
  },
}
