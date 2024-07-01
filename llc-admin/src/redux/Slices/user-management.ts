import { createSlice } from '@reduxjs/toolkit'

import { ILoginResponse, IUserDetail } from '@interfaces'
import { RootState } from '.'
import {
  deleteUserByIdAction,
  getAllUsersAction,
  getUserByIdAction,
  recoverUserByIdAction,
  updateUserByIdAction,
} from '../actions'
import { thunkActionLoading } from '@configs'
interface IUsersState {
  users: ILoginResponse[] | null
  user: IUserDetail | null
  usersCurrentPage: string | number
  usersTotalPage: string | number
  usersTotalItems: string | number
  selectedUser: IUserDetail | null
  loadings: Record<string, boolean | undefined>
}

const initialState: IUsersState = {
  users: [],
  user: null,
  usersCurrentPage: 0,
  usersTotalPage: 0,
  usersTotalItems: 0,
  selectedUser: null,
  loadings: {},
}

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsersAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_ALL_USER_ACTION_LOADING] = true
    })
    builder.addCase(getAllUsersAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_ALL_USER_ACTION_LOADING] = false
      state.users = action.payload?.items ?? []
      state.usersCurrentPage = action.payload?.page ?? 0
      state.usersTotalPage = Math.ceil(
        action.payload?.total / action.payload?.limit
      )
      state.usersTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getAllUsersAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_ALL_USER_ACTION_LOADING] = false
    })
    builder.addCase(getUserByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_USER_BY_ID_ACTION_LOADING] = true
    })
    builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_USER_BY_ID_ACTION_LOADING] = false
      state.user = action.payload ?? {}
    })
    builder.addCase(getUserByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_USER_BY_ID_ACTION_LOADING] = false
    })
    builder.addCase(updateUserByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_USER_ACTION_LOADING] = true
    })
    builder.addCase(updateUserByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_USER_ACTION_LOADING] = false
      state.user = action.payload.data ?? {}
    })
    builder.addCase(updateUserByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_USER_ACTION_LOADING] = false
    })
    builder.addCase(recoverUserByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.RECOVER_USER_ACTION_LOADING] = true
    })
    builder.addCase(recoverUserByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.RECOVER_USER_ACTION_LOADING] = false
      state.user = action.payload.data.data ?? {}
    })
    builder.addCase(recoverUserByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.RECOVER_USER_ACTION_LOADING] = false
    })
    builder.addCase(deleteUserByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_USER_ACTION_LOADING] = true
    })
    builder.addCase(deleteUserByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_USER_ACTION_LOADING] = false
    })
    builder.addCase(deleteUserByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_USER_ACTION_LOADING] = false
    })
  },
})

export const usersActions = {
  ...usersSlice.actions,
}

export const selectUsersLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default usersSlice.reducer
