import { is } from 'immer/dist/internal'
import {
  ICMessageItem,
  IItemInListChatRoom,
  IResponseCreateChatRoom,
  IUserChat,
  Participants,
} from './../../interfaces/chat'
import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import {
  createChatRoom,
  getChatRoom,
  getMessages,
  getUserChat,
  toggleReadStatus,
  uploadFile,
} from '../actions/chat'
interface IChatState {
  isNewChat: boolean
  listUserChat: IUserChat[]
  currentChatRoom?: IItemInListChatRoom
  currentPartner?: Participants
  listChatRoom: IItemInListChatRoom[]
  listMessages: ICMessageItem[]
  loadings: Record<string, boolean | undefined>
  totalMessages: number
  limitMessages: number
}

const initialState: IChatState = {
  isNewChat: false,
  listUserChat: [],
  currentChatRoom: undefined,
  currentPartner: undefined,
  listChatRoom: [],
  listMessages: [],
  loadings: {},
  totalMessages: 0,
  limitMessages: 0,
}

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    addMessage: (state, action) => {
      const isExist = state.listMessages.find(
        (item) => item?.id === action.payload?.id
      )

      const isTrueRoom = state.currentChatRoom?.id === action.payload?.roomId
      if (!isExist && isTrueRoom) {
        state.listMessages = [...state.listMessages, action.payload]
      }
    },
    setChatRoom: (state, action) => {
      state.currentChatRoom = action.payload
    },
    setPartner: (state, action) => {
      state.currentPartner = action.payload
    },
    updateRoom: (state, action) => {
      state.listChatRoom = state.listChatRoom.filter(
        (item, index) => item?.id !== action.payload?.id
      )
      state.listChatRoom.unshift(action.payload)
    },
    deleteMessage: (state, action) => {
      state.listMessages = state.listMessages.filter(
        (item) => item?.id !== action.payload?.id
      )
    },
    clearMessages: (state) => {
      state.listMessages = []
    },

    receiveDeleteMessage: (state, action) => {
      const deletedMessage = state.listMessages.find(
        (item) => item?.id === action?.payload?.id
      )
      const indexOfDeletedMessage = state.listMessages.findIndex(
        (item) => item?.id === action?.payload?.id
      )

      if (indexOfDeletedMessage === state.listMessages.length - 1) {
        state.listChatRoom?.forEach((item, index) => {
          if (item?.id === action?.payload?.roomId) {
            state.listChatRoom[index].lastMessage.content =
              'A message has been unsent'
          }
        })
      }

      state.listMessages = state.listMessages.filter(
        (item) => item?.id !== action.payload?.id
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserChat.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_USER_CHAT_ACTION_LOADING] =
        true
    })
    builder.addCase(getUserChat.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_USER_CHAT_ACTION_LOADING] =
        false
      state.listUserChat = action.payload?.items ?? []
    })
    builder.addCase(getUserChat.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_USER_CHAT_ACTION_LOADING] =
        false
    })
    builder.addCase(createChatRoom.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_CHAT_ROOM_ACTION_LOADING] = true
    })
    builder.addCase(createChatRoom.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_CHAT_ROOM_ACTION_LOADING] = false
      state.currentChatRoom = action.payload ?? {}
    })
    builder.addCase(createChatRoom.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_CHAT_ROOM_ACTION_LOADING] = false
    })
    builder.addCase(getChatRoom.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHAT_ROOM_ACTION_LOADING] =
        true
    })
    builder.addCase(getChatRoom.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CHAT_ROOM_ACTION_LOADING] =
        false
      if (action.payload === null) return
      state.listChatRoom =
        action.payload.filter((item, index) => {
          return item !== null
        }) ?? []
    })
    builder.addCase(getChatRoom.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHAT_ROOM_ACTION_LOADING] =
        false
    })
    builder.addCase(getMessages.pending, (state) => {
      state.loadings[thunkActionLoading.GET_MESSAGE_BY_ROOM_ID_ACTION_LOADING] =
        true
    })
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_MESSAGE_BY_ROOM_ID_ACTION_LOADING] =
        false
      state.totalMessages = action.payload?.total
      state.limitMessages = action.payload?.limit

      const reversedItems = action.payload?.items
      if (reversedItems.length > 0) {
        reversedItems.forEach((item) => {
          state.listMessages.unshift(item)
        })
      }
    })
    builder.addCase(getMessages.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_MESSAGE_BY_ROOM_ID_ACTION_LOADING] =
        false
    })
    builder.addCase(uploadFile.pending, (state) => {
      state.loadings[thunkActionLoading.UPLOAD_FILE_ACTION_LOADING] = true
    })
    builder.addCase(uploadFile.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPLOAD_FILE_ACTION_LOADING] = false
    })
    builder.addCase(uploadFile.rejected, (state) => {
      state.loadings[thunkActionLoading.UPLOAD_FILE_ACTION_LOADING] = false
    })
    builder.addCase(toggleReadStatus.pending, (state) => {
      state.loadings[thunkActionLoading.TOGGE_READ_ROOM_ACTION_LOADING] = true
    })
    builder.addCase(toggleReadStatus.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.TOGGE_READ_ROOM_ACTION_LOADING] = false
      state.listChatRoom?.forEach((item, index) => {
        if (item?.id === action.payload?.roomId) {
          state.listChatRoom[index].isRead = action.payload?.isRead
        }
      })
    })
    builder.addCase(toggleReadStatus.rejected, (state) => {
      state.loadings[thunkActionLoading.TOGGE_READ_ROOM_ACTION_LOADING] = false
    })
  },
})

export const chatActions = {
  ...chatSlice.actions,
}

export const selectChatLoading = (state: RootState, name: string) =>
  state.userLog.loadings[`${name}Loading`]

export default chatSlice.reducer
