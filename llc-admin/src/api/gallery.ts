import {
  EMediaCategory,
  EMediaType,
  IRequestGetMedia,
  IResponseGetMedia,
} from 'src/interfaces/gallery'
import { IUploadMediaResponse } from 'src/interfaces/media'
import { ApiClient } from './axiosClient'

const baseEndPoint = '/media'

export const galleryAPI = {
  getMedia: (params: IRequestGetMedia) => {
    return ApiClient.get<IResponseGetMedia>(`${baseEndPoint}?`, {
      params,
    })
  },

  getVideos: (params: {
    category: EMediaCategory
    page: number
    limit: number
  }) => {
    return ApiClient.get<IResponseGetMedia>(
      `${baseEndPoint}?type=${EMediaType.VIDEO}`,
      {
        params,
      }
    )
  },
  getImages: (params: {
    category: EMediaCategory
    page: number
    limit: number
  }) => {
    return ApiClient.get<IResponseGetMedia>(
      `${baseEndPoint}?type=${EMediaType.IMAGE}`,
      {
        params,
      }
    )
  },

  uploadImage: (file: File, category?: EMediaCategory) => {
    const formData = new FormData()
    formData.append('file', file)
    if (category) formData.append('category', category)

    return ApiClient.post<IUploadMediaResponse>(`/media/resize-resolution`, formData)
  },

  uploadVideo: (file: File, category?: EMediaCategory) => {
    const formData = new FormData()
    formData.append('file', file)
    if (category) formData.append('category', category)

    return ApiClient.post<IUploadMediaResponse>(`/media/video-media`, formData)
  },
}
