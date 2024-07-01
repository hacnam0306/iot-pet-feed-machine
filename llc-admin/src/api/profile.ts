import { EAuthType } from '@configs'
import { ApiClient } from './axiosClient'
import { IChangeProfileData, IProfile } from '@interfaces'

const baseEndPoint = '/auth'

export const profileAPI = {
  getAdminProfile: () => {
    return ApiClient.get<IProfile>(`users/device`)
  },

  updateAdminProfile: (data: IChangeProfileData) => {
    return ApiClient.put<{ message: string; user: IProfile }>(`users/profile`, {
      name: data.name,
      phone: data.phone,
      profilePhotoId: data.profilePhotoId,
      description: data.description,
    })
  },
}
