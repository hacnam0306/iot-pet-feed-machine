import { createSlice } from '@reduxjs/toolkit'

import {
  IChartData,
  IFetchRevenueStatSuccessData,
  IUserDetail,
  IUserStat,
} from '@interfaces'
import { RootState } from '.'
import {
  getRevenueStatAction,
  getNewUserStatAction,
  getStatisticChartUSer,
  getStatisticChartIncome,
} from '../actions'
import { thunkActionLoading } from '@configs'
interface IUsersState {
  users: IUserDetail[] | null
  userStats: IUserStat[] | null
  revenueStats: IFetchRevenueStatSuccessData | null
  loadings: Record<string, boolean | undefined>
  statisticChartUSer: IChartData[]
  statisticChartUSerIncome: IChartData[]
}

const initialState: IUsersState = {
  users: [],
  userStats: [],
  revenueStats: null,
  loadings: {},
  statisticChartUSer: [],
  statisticChartUSerIncome: [],
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRevenueStatAction.pending, (state) => {
      state.loadings[`getRevenueStatActionLoading`] = true
    })
    builder.addCase(getRevenueStatAction.fulfilled, (state, action) => {
      state.revenueStats = action.payload ?? {}
      state.loadings[`getRevenueStatActionLoading`] = false
    })
    builder.addCase(getRevenueStatAction.rejected, (state) => {
      state.loadings[`getRevenueStatActionLoading`] = false
    })
    builder.addCase(getNewUserStatAction.pending, (state) => {
      state.loadings[`getNewUserStatActionLoading`] = true
    })
    builder.addCase(getNewUserStatAction.fulfilled, (state, action) => {
      state.users = action.payload?.summary ?? []
      state.userStats = action.payload?.userStats ?? []
      state.loadings[`getNewUserStatActionLoading`] = false
    })
    builder.addCase(getNewUserStatAction.rejected, (state) => {
      state.loadings[`getNewUserStatActionLoading`] = false
    })
    ////STATISTIC CHART USER
    builder.addCase(getStatisticChartUSer.fulfilled, (state, action) => {
      state.statisticChartUSer = action.payload
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_LOADING] = false
    })
    builder.addCase(getStatisticChartUSer.pending, (state, action) => {
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_LOADING] = true
    })
    builder.addCase(getStatisticChartUSer.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_LOADING] = false
    })
    ////STATISTIC CHART Income
    builder.addCase(getStatisticChartIncome.fulfilled, (state, action) => {
      state.statisticChartUSerIncome = action.payload
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_INCOME_LOADING] =
        false
    })
    builder.addCase(getStatisticChartIncome.pending, (state, action) => {
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_INCOME_LOADING] =
        true
    })
    builder.addCase(getStatisticChartIncome.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_STATISTIC_CHART_INCOME_LOADING] =
        false
    })
  },
})

export const dashboardActions = {
  ...dashboardSlice.actions,
}

export const selectDashboardLoading = (state: RootState, name: string) =>
  state.plans.loadings[`${name}Loading`]

export default dashboardSlice.reducer
