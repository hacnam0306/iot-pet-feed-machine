//
import { createAsyncThunk } from '@reduxjs/toolkit'
import { lessonManagementAPI } from 'src/api/lesson-management'
import { ILessonCreateForm } from 'src/interfaces/lesson'

export const deleteLessonAction = createAsyncThunk(
  'lesson/deleteLesson',
  async (id: number, { fulfillWithValue }) => {
    try {
      const res = await lessonManagementAPI.deleteLesson(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getLessonById = createAsyncThunk(
  'lesson/getLessonById',
  async (payload: { id: number }, { fulfillWithValue }) => {
    try {
      const res = await lessonManagementAPI.getLessonById(payload.id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createLesson = createAsyncThunk(
  'lesson/createLesson',
  async (
    payload: Partial<ILessonCreateForm> & {
      mediaIds?: number[]
    }
  ) => {
    try {
      const res = await lessonManagementAPI.createLesson(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const editLesson = createAsyncThunk(
  'lesson/editLesson',
  async (
    payload: Partial<ILessonCreateForm> & {
      mediaIds?: number[]
      id: string | number
    }
  ) => {
    try {
      const res = await lessonManagementAPI.editLesson(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const uploadLessonMedia = createAsyncThunk(
  'lesson/uploadLessonMedia',
  async (
    payload: Partial<ILessonCreateForm> & {
      mediaIds?: number[]
    }
  ) => {
    try {
      const res = await lessonManagementAPI.createLesson(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
