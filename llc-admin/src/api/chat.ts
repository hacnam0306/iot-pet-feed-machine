import {
  IItemInListChatRoom,
  IResponseCreateChatRoom,
  IResponseFetchAllUserChat,
  IResponseGetMessages,
} from 'src/interfaces/chat'
import { ApiClient } from './axiosClient'
import { IResponseToggleReadState, IResponseUploadFile } from '@interfaces'

export const chatAPI = {
  getUserChat: async ({
    search,
    limit = '1000',
    page,
  }: {
    search: string
    limit?: string
    page?: string
  }) => {
    return await ApiClient.get<IResponseFetchAllUserChat>(
      `users/list-admins?status=active`,
      {
        params: {
          search,
          limit,
          page,
        },
      }
    )
  },
  createChatRoom: async (payload: { receiverId: number }) => {
    return await ApiClient.post<IItemInListChatRoom>(`chat-rooms`, payload)
  },
  getChatRoom: async () => {
    return await ApiClient.get<IItemInListChatRoom[]>(`chat-rooms`)
  },
  getMessages: async (payload: {
    roomId: number
    page: number
    limit: number
  }) => {
    return await ApiClient.get<IResponseGetMessages>(
      `/messages/${payload.roomId}`,
      {
        params: {
          limit: payload?.limit,
          page: payload?.page,
        },
      }
    )
  },
  uploadFile: async (file: string | Blob) => {
    try {
      const formData = new FormData()
      formData.append('file', file)

      return await ApiClient.post<IResponseUploadFile>(
        'media/chat-media',
        formData
      )
    } catch (error) {
      console.error(error)
    }
  },
  toggleReadStatus: async (payload: { roomId: number; isRead: boolean }) => {
    return await ApiClient.put<IResponseToggleReadState>(
      `user-rooms/${payload.roomId}`,
      {
        isRead: payload.isRead,
      }
    )
  },
}
