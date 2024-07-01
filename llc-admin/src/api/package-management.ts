import { ApiClient } from 'src/api/axiosClient'
import {
  ICreatePackageSuccessData,
  IGetPackageSuccessData,
  IPackage,
  IPackageBenefitsModule,
} from 'src/interfaces/package-management'
import { ICommonGetParams } from 'src/interfaces/app'
import { objectToQueryString } from 'src/utils'

export const packageManagementAPI = {
  getPackageBenefits: async () => {
    return await ApiClient.get<IPackageBenefitsModule[]>('/package-benefits')
  },
  getListPackage: async (params: ICommonGetParams) => {
    return await ApiClient.get<IGetPackageSuccessData>('/packages', {
      params: {
        ...params,
        sort: objectToQueryString(params.sort || {}) || undefined,
      },
    })
  },
  createPackage: async (payload: IPackage) => {
    return await ApiClient.post<ICreatePackageSuccessData, IPackage>(
      '/packages',
      payload
    )
  },

  getPackageById: async (id: string | number) => {
    return await ApiClient.get<IPackage>(`/packages/${id}`)
  },
  updatePackage: async ({ id, ...payload }: IPackage) => {
    return await ApiClient.put<ICreatePackageSuccessData, IPackage>(
      `/packages/${id}`,
      payload
    )
  },
  deletePackage: async (id: string | number) => {
    return await ApiClient.delete<any>(`/packages/${id}`)
  },
}
