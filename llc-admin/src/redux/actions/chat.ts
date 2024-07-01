//
import { createAsyncThunk } from '@reduxjs/toolkit'
import { chatAPI } from 'src/api/chat'

export const getUserChat = createAsyncThunk(
  'chat/getUserChat',
  async (
    payload: { search: string; limit?: string; page?: string },
    { fulfillWithValue }
  ) => {
    try {
      const res = await chatAPI.getUserChat(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createChatRoom = createAsyncThunk(
  'chat/createChatRoom',
  async (payload: { receiverId: number }) => {
    try {
      const res = await chatAPI.createChatRoom(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getChatRoom = createAsyncThunk('chat/getChatRoom', async () => {
  try {
    const res = await chatAPI.getChatRoom()
    return res.data
  } catch (error) {
    throw error
  }
})

export const getMessages = createAsyncThunk(
  'chat/getMessages',
  async (payload: { roomId: number; page: number; limit: number }) => {
    try {
      const res = await chatAPI.getMessages(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const uploadFile = createAsyncThunk(
  'chat/uploadFile',
  async (file: string | Blob) => {
    try {
      const res = await chatAPI.uploadFile(file)
      return res?.data
    } catch (error) {
      throw error
    }
  }
)

export const toggleReadStatus = createAsyncThunk(
  'chat/toggleReadStatus',
  async (payload: { roomId: number; isRead: boolean }) => {
    try {
      const res = await chatAPI.toggleReadStatus(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
