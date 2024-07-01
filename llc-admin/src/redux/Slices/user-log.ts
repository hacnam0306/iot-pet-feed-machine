import { createSlice } from '@reduxjs/toolkit'
import { thunkActionLoading } from '@configs'
import { ActivityLogItem } from 'src/interfaces/user-log'
import { RootState } from '.'
import {
  getTransactionsAction,
  getUserLogByIdAction,
  getUserLogByUserIdAction,
} from '../actions/user-log'
import { ITransaction } from 'src/interfaces'
interface ILogsState {
  userLogs: ActivityLogItem[] | null
  userLog: ActivityLogItem | null
  userLogCurrentPage: string | number
  userLogTotalPage: string | number
  userLogTotalItems: string | number
  userLogLimit: string | number
  transactions: ITransaction[]
  pageTransaction: number | string
  totalPageTransaction: number | string
  loadings: Record<string, boolean | undefined>
}

const initialState: ILogsState = {
  userLogs: [],
  userLog: null,
  userLogCurrentPage: 0,
  userLogTotalPage: 0,
  userLogTotalItems: 0,
  userLogLimit: 0,
  transactions: [],
  pageTransaction: 0,
  totalPageTransaction: 0,
  loadings: {},
}

const userLogSlice = createSlice({
  name: 'userLogs',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserLogByUserIdAction.pending, (state) => {
      state.loadings[
        thunkActionLoading.GET_USER_LOG_BY_USER_ID_ACTION_LOADING
      ] = true
    })
    builder.addCase(getUserLogByUserIdAction.fulfilled, (state, action) => {
      state.loadings[
        thunkActionLoading.GET_USER_LOG_BY_USER_ID_ACTION_LOADING
      ] = false
      state.userLogs = action.payload?.items ?? []
      state.userLogCurrentPage = action.payload?.page ?? 0
      state.userLogTotalPage = Math.ceil(
        action.payload.total / action.payload.limit
      )
      state.userLogLimit = action.payload?.limit ?? 0
      state.userLogTotalItems = action.payload?.total ?? 0
    })
    builder.addCase(getUserLogByUserIdAction.rejected, (state) => {
      state.loadings[
        thunkActionLoading.GET_USER_LOG_BY_USER_ID_ACTION_LOADING
      ] = false
    })
    builder.addCase(getUserLogByIdAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_USER_LOG_BY_ID_ACTION_LOADING] =
        true
    })
    builder.addCase(getUserLogByIdAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_USER_LOG_BY_ID_ACTION_LOADING] =
        false
      state.userLog = action?.payload
    })
    builder.addCase(getUserLogByIdAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_USER_LOG_BY_ID_ACTION_LOADING] =
        false
    })

    builder.addCase(getTransactionsAction.pending, (state) => {
      state.loadings['getTransactionsActionLoading'] = true
    })
    builder.addCase(getTransactionsAction.fulfilled, (state, action) => {
      state.loadings['getTransactionsActionLoading'] = false
      state.transactions = action?.payload.items
      state.pageTransaction = action?.payload.page
      state.totalPageTransaction = action?.payload.total
    })
    builder.addCase(getTransactionsAction.rejected, (state) => {
      state.loadings['getTransactionsActionLoading'] = false
    })
  },
})

export const userLogActions = {
  ...userLogSlice.actions,
}

export const selectUserLogLoading = (state: RootState, name: string) =>
  state.userLog.loadings[`${name}Loading`]

export default userLogSlice.reducer
