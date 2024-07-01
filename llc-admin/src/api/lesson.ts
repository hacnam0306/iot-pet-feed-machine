import { GetAssignmentResponse, IAssignment } from '@interfaces'
import { ApiClient } from './axiosClient'
import { Axios, AxiosRequestConfig } from 'axios'
import { IUploadMediaResponse } from 'src/interfaces/media'

const baseEndPoint = '/lessons'

export const lessonAPI = {
  createAssignment: (payload: IAssignment) => {
    return ApiClient.post<IAssignment>(`${baseEndPoint}/assigments`, payload)
  },

  createMediaLesson: (payload: IAssignment) => {
    return ApiClient.post<IAssignment>(`${baseEndPoint}/media`, payload)
  },

  getAssignment: (id: number) => {
    return ApiClient.get<GetAssignmentResponse>(`${baseEndPoint}/${id}`)
  },

  updateAssignment: (id: number, payload: Partial<IAssignment>) => {
    return ApiClient.put<IAssignment>(
      `${baseEndPoint}/assigments/${id}`,
      payload
    )
  },
  updateMediaLesson: (id: number, payload: Partial<IAssignment>) => {
    return ApiClient.put<IAssignment>(`${baseEndPoint}/media/${id}`, payload)
  },

  deleteAssignment: (id: number) => {
    return ApiClient.delete<IAssignment>(`${baseEndPoint}/${id}`)
  },

  createFinalTest: (body: IAssignment) => {
    return ApiClient.post<Partial<IAssignment>>(
      `${baseEndPoint}/final-tests`,
      body
    )
  },

  updateFinalTest: (id: number, body: Partial<IAssignment>) => {
    return ApiClient.put<Partial<IAssignment>>(
      `${baseEndPoint}/final-tests/${id}`,
      body
    )
  },

  uploadMedia: (file: File, config: AxiosRequestConfig<any>) => {
    const formData = new FormData()
    formData.append('file', file)

    return (ApiClient as Axios).post<IUploadMediaResponse>(
      `/media/lesson-media`,
      formData,
      config
    )
  },
}
