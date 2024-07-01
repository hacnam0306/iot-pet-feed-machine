import { createAsyncThunk } from '@reduxjs/toolkit'

import { dashboardAPI } from '@api'
import { IDashboardParams, IGetStatisticChartRequest } from '@interfaces'
import moment from 'moment'

export const getRevenueStatAction = createAsyncThunk(
  'dashboard/getRevenueStatAction',
  async (params: IDashboardParams) => {
    try {
      const localParams = params || {
        from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
      const res = await dashboardAPI.getRevenueStat(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getNewUserStatAction = createAsyncThunk(
  'dashboard/getNewUserStatAction',
  async (params: IDashboardParams) => {
    try {
      const localParams = params || {
        from: moment().subtract(7, 'days').format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }
      const res = await dashboardAPI.getNewUserStat(localParams)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getStatisticChartUSer = createAsyncThunk(
  'dashboard/getDataChartUsers',
  async (data?: { params?: IGetStatisticChartRequest }) => {
    try {
      const res = await dashboardAPI.getStatisticChart(data?.params)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getStatisticChartIncome = createAsyncThunk(
  'dashboard/getDataChartIncome',
  async (data?: { params?: IGetStatisticChartRequest }) => {
    try {
      const res = await dashboardAPI.getStatisticChart(data?.params, 'income')
      return res.data
    } catch (error) {
      throw error
    }
  }
)
