import { createAsyncThunk } from '@reduxjs/toolkit'
import { seoConfigManagementAPI } from 'src/api/seo-config'
import { IUpdateSeoConfig } from 'src/interfaces/seo-config'

export const updateSeoConfigByCourseId = createAsyncThunk(
  'seo-config/course/updateSeoConfig',
  async (payload: IUpdateSeoConfig) => {
    try {
      const courseId = payload.id
      const customPayload = {
        canonical: payload.metaData.canonical,
        keywords: payload.metaData.keywords,
        metaDescription: payload.metaData.metaDescription,
        metaImage: payload.metaData.metaImage,
        metaTitle: payload.metaData.metaTitle,
      }

      const res = await seoConfigManagementAPI.updateSeoConfigByCourseId(
        courseId,
        customPayload
      )
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getSeoConfigByCourse = createAsyncThunk(
  'seo-config/course/getSeoConfig',
  async (courseId: number) => {
    try {
      const res = await seoConfigManagementAPI.getSeoConfigByCourse(courseId)
      return res
    } catch (error) {
      throw error
    }
  }
)
