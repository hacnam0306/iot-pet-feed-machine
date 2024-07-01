import { createAsyncThunk } from '@reduxjs/toolkit'
import { courseManagementAPI } from 'src/api/course'
import {
  IAddLandingParams,
  ISeoMetaData,
} from 'src/interfaces/aboutus-management'
import { ICourseParams } from 'src/interfaces/course'

export const getListCourseAction = createAsyncThunk(
  'course/getListCourseAction',
  async ({ limit = 10, ...otherParams }: ICourseParams) => {
    try {
      const res = await courseManagementAPI.getListCourse({
        limit,
        ...otherParams,
      })
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getCourseSectionDetailAction = createAsyncThunk(
  'course/getCourseSectionDetailAction',
  async (courseId: number) => {
    try {
      const res = await courseManagementAPI.getCourseSection(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const addSectionAction = createAsyncThunk(
  'course/addSections',
  async (data: {
    title: string
    description: string
    titleInDutch: string
    descriptionInDutch: string
    courseId: number
  }) => {
    try {
      const res = await courseManagementAPI.addSections(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const editSectionAction = createAsyncThunk(
  'course/editSections',
  async (data: {
    title: string
    description: string
    titleInDutch: string
    descriptionInDutch: string
    sectionId: number
  }) => {
    const { sectionId, ...rest } = data
    try {
      const res = await courseManagementAPI.editSections(sectionId, rest)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const deleteSectionAction = createAsyncThunk(
  'course/deleteSectionAction',
  async (id: number) => {
    try {
      const res = await courseManagementAPI.deleteSections(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

// export const uploadThumbnailAction = createAsyncThunk(
//   'course/uploadThumbnailAction',
//   async (file: File) => {
//     try {
//       const res = await courseManagementAPI.uploadMedia(file)
//       return res
//     } catch (error) {
//       throw error
//     }
//   }
// )

export const addNewCourseAction = createAsyncThunk(
  'course/addNewCourseAction',
  async (params: any) => {
    try {
      const res = await courseManagementAPI.addNewCourse(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getCourseDetailAction = createAsyncThunk(
  'course/getCourseDetailAction',
  async (courseId: string) => {
    try {
      const res = await courseManagementAPI.getCourseDetail(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getCoursePageSeoAction = createAsyncThunk(
  'course-managemant/seo/get',
  async () => {
    try {
      const res = await courseManagementAPI.getCoursePageSeo()
      return res
    } catch (error) {
      throw error
    }
  }
)
export const updateCoursePageSeoAction = createAsyncThunk(
  'course-managemant/seo/update',
  async (params: Partial<ISeoMetaData>) => {
    try {
      const res = await courseManagementAPI.updateCoursePageSeo(params)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const createLandingCourseAction = createAsyncThunk(
  'course/landing/create',
  async (params: IAddLandingParams) => {
    try {
      const res = await courseManagementAPI.createLanding(params)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getLandingCourseAction = createAsyncThunk(
  'course-management/landing/get',
  async () => {
    try {
      const res = await courseManagementAPI.getLanding()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateCourseByIdAction = createAsyncThunk(
  'course/updateCourseByIdAction',
  async ({ courseId, params }: any) => {
    try {
      const res = await courseManagementAPI.updateCourseById(courseId, params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteCourseByIdAction = createAsyncThunk(
  'course/deleteCourseByIdAction',
  async (courseId: string | number) => {
    try {
      const res = await courseManagementAPI.deleteCourseById(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const highLightByIdAction = createAsyncThunk(
  'course/highLightByIdAction',
  async (courseId: string | number) => {
    try {
      const res = await courseManagementAPI.highLightCourseId(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const duplicateCourseByIdAction = createAsyncThunk(
  'course/duplicateCourseByIdAction',
  async (courseId: number | string) => {
    try {
      const res = await courseManagementAPI.duplicateCourseById(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)
