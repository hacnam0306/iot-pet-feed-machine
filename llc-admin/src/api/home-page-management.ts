import {
  HomePageContent,
  ICommonContentDetail,
  IHomeContentRequest,
  IHomePositionContent,
} from 'src/interfaces/aboutus-management'
import { ApiClient } from './axiosClient'

export const homePageManagement = {
  getListContent: async () => {
    return await ApiClient.get<any>('/common-contents/homepage-section')
  },
  deleteContent: async (id: number) => {
    return await ApiClient.delete(`/common-contents/homepage-section/${id}`)
  },
  addNewContent: async (data: Partial<IHomeContentRequest>) => {
    return await ApiClient.post<{
      homepageSection: HomePageContent
      message: string
    }>('/common-contents/homepage-section', data)
  },
  editContent: async (id: number, data: Partial<IHomeContentRequest>) => {
    return await ApiClient.put<{
      homepageSection: HomePageContent
      message: string
    }>(`/common-contents/homepage-section/${id}`, data)
  },
  editPositionContent: async (data: { homepages: IHomePositionContent[] }) => {
    return await ApiClient.put<{
      homepageSection: HomePageContent
      message: string
    }>(`/common-contents/homepage-section-position`, data)
  },
}
