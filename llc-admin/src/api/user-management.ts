import { message } from 'antd'
import {
  IFetchUsersParams,
  IResponseFetchAllUsers,
  IUserDetail,
  TDeleteUserData,
  TUpdateUserData,
} from '@interfaces'
import { ApiClient } from './axiosClient'

export const userManagementAPI = {
  getAllUsers: async (params?: IFetchUsersParams) => {
    return await ApiClient.get<IResponseFetchAllUsers>('/users', {
      params,
    })
  },

  getUserById: async (id: string) => {
    return await ApiClient.get<IUserDetail>(`/users/${id}`)
  },

  updateUserById: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<{ data: IUserDetail; message: string }, {}>(
      `/users/${id}`,
      passPayload
    )
  },

  addUser: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.post<{ data: IUserDetail; message: string }, {}>(
      `/users`,
      passPayload
    )
  },

  recoverUserById: async (payload: Partial<TUpdateUserData>) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put<{ data: IUserDetail; message: string }, {}>(
      `/users/recover-user/${id}`
    )
  },

  deleteUserById: async (
    payload: Partial<TDeleteUserData> & { isSort?: boolean }
  ) => {
    const { id, isSoft, ...passPayload } = payload
    return await ApiClient.delete<{ status: boolean; message: string }, {}>(
      `/users/${id}?isSoft=${isSoft}`
    )
  },
}
