import { objectToQueryString } from '@utils'
import { ApiClient } from 'src/api/axiosClient'
import {
  IEmailContentForm,
  IEmailContentItem,
  IGetEmailContentsResponse,
  TGetEmailContentsParams,
} from 'src/interfaces/email-content-management'

export const emailContentAPI = {
  getEmailContents: async (params: TGetEmailContentsParams) => {
    return await ApiClient.get<IGetEmailContentsResponse>(`/email-contents`, {
      params: {
        ...params,
        sort: objectToQueryString({ createdAt: 'desc' }),
      },
    })
  },
  deleteEmailContent: async (id: number) => {
    return await ApiClient.delete(`/email-contents/${id}`)
  },
  getDetailEmailContent: async (id: number) => {
    return await ApiClient.get<IEmailContentItem>(`/email-contents/${id}`)
  },
  createEmailContent: async (payload: IEmailContentForm) => {
    return await ApiClient.post<IEmailContentForm>(`/email-contents`, payload)
  },
  updateEmailContent: async (
    payload: IEmailContentForm & {
      id: number | string
    }
  ) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<IEmailContentForm>(
      `/email-contents/${id}`,
      passPayload
    )
  },
  duplicateEmailContent: async (id: number) => {
    return await ApiClient.post(`/email-contents/${id}`)
  },
  resendEmailContent: async (id: number) => {
    return await ApiClient.post(`/email-contents/resend/${id}`)
  },
}
