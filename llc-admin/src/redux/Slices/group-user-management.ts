import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import {
  IGroupUser,
  ISubscribedEmail,
} from 'src/interfaces/group-user-management'
import {
  createGroupUserAction,
  deleteGroupUserAction,
  editGroupUserAction,
  getGroupUserByIdAction,
  getGroupUsersAction,
  getListSubscribedEmailAction,
} from '../actions/group-user-management'

interface IGroupUserSlice {
  groupUser: {
    groupUsers?: IGroupUser[]
    limit: number
    page: number
    total: number
    groupUsersByGroupId?: string[]
  }
  emailSubscriber: {
    emailSubscribers: ISubscribedEmail[] | undefined
    limit: number
    page: number
    total: number
  }
  loadings: Record<string, boolean | undefined>
}

const initialState: IGroupUserSlice = {
  groupUser: {
    groupUsers: undefined,
    limit: 0,
    page: 0,
    total: 0,
    groupUsersByGroupId: undefined,
  },
  emailSubscriber: {
    emailSubscribers: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  loadings: {},
}

const groupUserSlice = createSlice({
  name: 'groupUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get group users
    builder.addCase(getGroupUsersAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_GROUP_USERS_LOADING] = true
    })
    builder.addCase(getGroupUsersAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_GROUP_USERS_LOADING] = false
      state.groupUser.groupUsers = action.payload?.data?.items
      state.groupUser.limit = action.payload?.data?.limit
      state.groupUser.page = action.payload?.data?.page
      state.groupUser.total = action.payload?.data?.total
    })
    builder.addCase(getGroupUsersAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_GROUP_USERS_LOADING] = false
    })

    // Delete group users
    builder.addCase(deleteGroupUserAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_GROUP_USER_LOADING] = true
    })
    builder.addCase(deleteGroupUserAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_GROUP_USER_LOADING] = false
    })
    builder.addCase(deleteGroupUserAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_GROUP_USER_LOADING] = false
    })

    // Get list subscribed email
    builder.addCase(getListSubscribedEmailAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_SUBSCRIBED_EMAIL_LOADING] =
        true
    })
    builder.addCase(getListSubscribedEmailAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_SUBSCRIBED_EMAIL_LOADING] =
        false

      state.emailSubscriber.emailSubscribers = action.payload?.data?.items
      state.emailSubscriber.limit = action.payload?.data?.limit
      state.emailSubscriber.page = action.payload?.data?.page
      state.emailSubscriber.total = action.payload?.data?.total
    })
    builder.addCase(getListSubscribedEmailAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_SUBSCRIBED_EMAIL_LOADING] =
        false
    })

    // Create group users
    builder.addCase(createGroupUserAction.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_GROUP_USER_LOADING] = true
    })
    builder.addCase(createGroupUserAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_GROUP_USER_LOADING] = false
    })
    builder.addCase(createGroupUserAction.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_GROUP_USER_LOADING] = false
    })

    // Get group users by ID
    builder.addCase(getGroupUserByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_GROUP_USER_BY_ID_LOADING] = true
    })
    builder.addCase(getGroupUserByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_GROUP_USER_BY_ID_LOADING] = false
      state.groupUser.groupUsersByGroupId = action.payload.data.emailSubscribers
    })
    builder.addCase(getGroupUserByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_GROUP_USER_BY_ID_LOADING] = false
    })

    // Update/edit group users by ID
    builder.addCase(editGroupUserAction.pending, (state) => {
      state.loadings[thunkActionLoading.EDIT_GROUP_USER_LOADING] = true
    })
    builder.addCase(editGroupUserAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.EDIT_GROUP_USER_LOADING] = false
    })
    builder.addCase(editGroupUserAction.rejected, (state) => {
      state.loadings[thunkActionLoading.EDIT_GROUP_USER_LOADING] = false
    })
  },
})

export const groupUserActions = {
  ...groupUserSlice.actions,
}

export default groupUserSlice.reducer
