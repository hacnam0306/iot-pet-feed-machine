import {
  IChartData,
  IDashboardParams,
  IFetchNewUserStatSuccessData,
  IFetchRevenueStatSuccessData,
  IGetStatisticChartRequest,
} from '@interfaces'
import { ApiClient } from './axiosClient'

const STATISTIC_URL = '/statistics'
const GET_USER = '/users'
const GET_INCOME = '/income'

export const dashboardAPI = {
  getRevenueStat: async (params: IDashboardParams) => {
    return await ApiClient.get<IFetchRevenueStatSuccessData>(
      '/transaction/stats',
      {
        params,
      }
    )
  },

  getNewUserStat: async (params: IDashboardParams) => {
    return await ApiClient.get<IFetchNewUserStatSuccessData>('/users/stats', {
      params,
    })
  },

  getStatisticChart: async (
    params?: IGetStatisticChartRequest,
    type: 'users' | 'income' = 'users'
  ) => {
    return await ApiClient.get<IChartData[]>(
      `${STATISTIC_URL}${type === 'users' ? GET_USER : GET_INCOME}`,
      {
        params: params,
      }
    )
  },
}
