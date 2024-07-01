import { IFetchUsersParams, IResponseFetchAllUsers } from '@interfaces'
import { objectToQueryString } from '@utils'
import { ApiClient } from 'src/api/axiosClient'
import {
  IAddNewBlogValue,
  IBlogParams,
  IGetBlogSuccessData,
  IResponseCreateBlog,
  IResponseGetBlogDetail,
  IResponseUploadThumbnail,
} from 'src/interfaces/blog'

export const blogManagementAPI = {
  getListBlog: async (params: IBlogParams) => {
    return await ApiClient.get<IGetBlogSuccessData>('/posts', {
      params: {
        ...params,
        sort: objectToQueryString(params.sort || {}) || undefined,
      },
    })
  },

  uploadMedia: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    return await ApiClient.post<IResponseUploadThumbnail>(
      '/media/resize-resolution',
      formData
    )
  },

  getAuthorAdmins: async (params?: IFetchUsersParams) => {
    return await ApiClient.get<IResponseFetchAllUsers>('/users/list-admins', {
      params,
    })
  },

  getAuthorTeachers: async (params?: IFetchUsersParams) => {
    return await ApiClient.get<IResponseFetchAllUsers>('/users/teachers', {
      params,
    })
  },

  getCategories: async () => {
    return await ApiClient.get('/categories')
  },

  addNewBlog: async (params: IAddNewBlogValue) => {
    return await ApiClient.post<IResponseCreateBlog>('/posts', {
      title: params.title,
      content: params.content,
      authorId: params.authorId,
      published: params.published,
      showAuthorName: params.showAuthorName,
      tagIds: params.tagsIds,
      slug: params.urlSlug,
      metaTitle: params.metaTitle,
      metaDescription: params.metaDescription,
      canonical: params.canonical,
      schemaMarkup: params.schemaMarkup,
      metaImage: params.metaImage,
      postDate: new Date(params.postDate).toISOString(),
      keywords: params.keywords,
      type: params.type,
      language: params.language,
      thumbnailId: params.thumbnailId,
      isDiscover: params.isDiscover,
    })
  },

  getBlogDetail: async (blogId: string) => {
    return await ApiClient.get<IResponseGetBlogDetail>(`/posts/${blogId}`)
  },

  updateBlogById: async (blogId: string | number, params: IAddNewBlogValue) => {
    return await ApiClient.put<IResponseCreateBlog>(`/posts/${blogId}`, {
      title: params.title,
      content: params.content,
      authorId: params.authorId,
      published: params.published,
      showAuthorName: params.showAuthorName,
      tagIds: params.tagsIds,
      slug: params.urlSlug,
      metaTitle: params.metaTitle,
      metaDescription: params.metaDescription,
      canonical: params.canonical,
      schemaMarkup: params.schemaMarkup,
      metaImage: params.metaImage,
      postDate: new Date(params.postDate).toISOString(),
      keywords: params.keywords,
      type: params.type,
      language: params.language,
      thumbnailId: params.thumbnailId,
      isDiscover: params.isDiscover,
    })
  },

  deleteBlogById: async (blogId: string | number) => {
    return await ApiClient.delete(`/posts/${blogId}`)
  },
}
