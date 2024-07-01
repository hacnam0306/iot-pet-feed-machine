import {
  ActivityLogItem,
  IFetchUserLogByUserIdParams,
  IResponseFetchAllActivityLogs,
} from 'src/interfaces/user-log'
import { ApiClient } from './axiosClient'
import {
  ICommonGetParams,
  ICommonGetSuccess,
  ITransaction,
} from 'src/interfaces'
import { objectToQueryString } from 'src/utils'

export const userLogAPI = {
  getUserLogByUserId: async ({
    id,
    page,
    limit,
    search,
  }: IFetchUserLogByUserIdParams) => {
    let baseURL = `activity-logs/admin/${id}?page=${page}&limit=${limit}`
    if (search) {
      baseURL += `&search=${search}`
    }
    return await ApiClient.get<IResponseFetchAllActivityLogs>(baseURL)
  },
  getUserLogById: async (id: string) => {
    return await ApiClient.get<ActivityLogItem>(
      `activity-logs/admin/detail/${id}`
    )
  },

  getTransactionHistories: async ({
    id,
    ...passParams
  }: ICommonGetParams & { id: number }) => {
    return await ApiClient.get<{ items: ITransaction[] } & ICommonGetSuccess>(
      `transaction-histories/${id}`,
      {
        params: {
          ...passParams,
          sort: objectToQueryString(passParams.sort || {}) || undefined,
        },
      }
    )
  },
}
