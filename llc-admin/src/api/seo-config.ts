import { ApiClient } from 'src/api/axiosClient'
import {
  IResponseUpdateSeoConfig,
  IUpdateSeoConfig,
  ISeoConfigDetail,
  IPayloadSeoConfig,
} from 'src/interfaces/seo-config'

export const seoConfigManagementAPI = {
  updateSeoConfigByCourseId: async (id: number, payload: IPayloadSeoConfig) => {
    return await ApiClient.put<IResponseUpdateSeoConfig>(
      `/seo-config/course/${id}`,
      payload
    )
  },
  getSeoConfigByCourse: async (courseId: number) => {
    return await ApiClient.get<IUpdateSeoConfig>(
      `/seo-config/course/${courseId}`
    )
  },
}
