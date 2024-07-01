import { ApiClient } from 'src/api/axiosClient'
import {
  TGetPostParams,
  TGetPostSuccessData,
} from 'src/interfaces/post-management'
import { ILessonCreateForm } from 'src/interfaces/lesson'

export const lessonManagementAPI = {
  getLessonById: async (id: number) => {
    return await ApiClient.get<any>(`/lessons/${id}`)
  },
  createLesson: async (
    payload: Partial<ILessonCreateForm> & {
      mediaIds?: number[]
    }
  ) => {
    return await ApiClient.post(`/lessons`, payload)
  },
  editLesson: async (
    payload: Partial<ILessonCreateForm> & {
      mediaIds?: number[]
      id: number | string
    }
  ) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put(`/lessons/${id}`, passPayload)
  },
  deleteLesson: async (id: number) => {
    return await ApiClient.delete(`/lessons/${id}`)
  },
  updateLesson: async ({ id, ...data }: { id: number }) => {
    return await ApiClient.put(`/lessons/${id}`, data)
  },
  addLesson: async (data: { name: string }) => {
    return await ApiClient.post(`/lessons`, data)
  },
}
