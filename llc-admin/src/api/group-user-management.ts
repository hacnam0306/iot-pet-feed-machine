import { objectToQueryString } from '@utils'
import { create } from 'lodash'
import { ApiClient } from 'src/api/axiosClient'
import {
  IGetGroupUserByIdResponse,
  IGetGroupUserResponse,
  IGroupUserForm,
  TGetGroupUserParams,
  TSubscribedEmailParams,
} from 'src/interfaces/group-user-management'

export const groupUserAPI = {
  getGroupUsers: async (params: TGetGroupUserParams) => {
    return await ApiClient.get<IGetGroupUserResponse>(`/user-groups`, {
      params: {
        ...params,
        sort: objectToQueryString({ createdAt: 'desc' }),
      },
    })
  },
  getGroupUserById: async (id: number) => {
    return await ApiClient.get<IGetGroupUserByIdResponse>(`/user-groups/${id}`)
  },
  createGroupUser: async (payload: Partial<IGroupUserForm>) => {
    return await ApiClient.post(`/user-groups`, payload)
  },
  editGroupUser: async (
    payload: Partial<IGroupUserForm> & {
      id: number | string
    }
  ) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put(`/user-groups/${id}`, passPayload)
  },
  deleteGroupUser: async (id: number) => {
    return await ApiClient.delete(`/user-groups/${id}`)
  },

  // Get list subscribed email
  getListSubscribedEmail: async (params: TSubscribedEmailParams) => {
    return await ApiClient.get<any>(`/email-subscribed/user-groups`, {
      params: {
        ...params,
        sort: objectToQueryString({ createdAt: 'desc' }),
      },
    })
  },
}
