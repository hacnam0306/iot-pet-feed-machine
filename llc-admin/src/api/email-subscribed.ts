import { ApiClient } from 'src/api/axiosClient'
import {
  ICreatePackageSuccessData,
  IGetPackageSuccessData,
  IPackage,
} from 'src/interfaces/package-management'
import { ICommonGetParams } from 'src/interfaces/app'
import { objectToQueryString } from 'src/utils'

export const emailSubscribedAPI = {
  getListEmailSub: async (params: ICommonGetParams) => {
    return await ApiClient.get<IGetPackageSuccessData>('/email-subscribed', {
      params: {
        ...params,
        sort: objectToQueryString(params.sort || {}) || undefined,
      },
    })
  },

  exportEmailSub: async () => {
    return await ApiClient.delete<any>(`/email-subscribed/export`)
  },
}
