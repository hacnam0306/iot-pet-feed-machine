import { ApiClient } from 'src/api/axiosClient'
import {
  TGetPostParams,
  TGetPostSuccessData,
} from 'src/interfaces/post-management'
import { IPostCreateForm } from 'src/interfaces/post-management'

export const postManagementAPI = {
  getPosts: async (params: TGetPostParams) => {
    return await ApiClient.get<TGetPostSuccessData>(`/admin-posts`, {
      params,
    })
  },
  getPostById: async (id: number) => {
    return await ApiClient.get<any>(`/admin-posts/${id}`)
  },
  createPost: async (
    payload: Partial<IPostCreateForm> & {
      mediaIds?: number[]
    }
  ) => {
    return await ApiClient.post(`/admin-posts`, payload)
  },
  editPost: async (
    payload: Partial<IPostCreateForm> & {
      mediaIds?: number[]
      id: number | string
    }
  ) => {
    const { id, ...passPayload } = payload
    return await ApiClient.put(`/admin-posts/${id}`, passPayload)
  },
  deletePost: async (id: number) => {
    return await ApiClient.delete(`/admin-posts/${id}`)
  },
  updatePost: async ({ id, ...data }: { id: number }) => {
    return await ApiClient.put(`/admin-posts/${id}`, data)
  },
  addPost: async (data: { name: string }) => {
    return await ApiClient.post(`/admin-posts`, data)
  },
  getAllComments: async ({ id, page }: { id: number; page: number }) => {
    return await ApiClient.get(`/comments/${id}?limit=5&page=${page}`)
  },
  getAllChildComments: async ({ id, page }: { id: number; page: number }) => {
    return await ApiClient.get(
      `/comments/comment/${id}?sort=createdAt:desc&limit=${5}`
    )
  },
  replyComments: async ({
    content,
    mediaId,
    id,
  }: {
    content: string
    mediaId: number
    id: number
  }) => {
    return await ApiClient.post(`/comments/comment/${id}`, {
      content,
      mediaId,
    })
  },

  postReaction: async ({
    type,
    postId,
    commentId,
  }: {
    type: string
    postId?: number
    commentId?: number
  }) => {
    return await ApiClient.post(`/reactions`, {
      type,
      postId,
      commentId,
    })
  },

  getTags: async () => {
    return await ApiClient.get(`/personalization-boards`)
  },
}
