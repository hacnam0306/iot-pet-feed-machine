//
import { createAsyncThunk } from '@reduxjs/toolkit'
import { postManagementAPI } from 'src/api/post-management'
import { TGetPostParams } from 'src/interfaces/post-management'
import { IPostCreateForm } from 'src/interfaces/post-management'

export const getPostsAction = createAsyncThunk(
  'post/getPosts',
  async (payload: TGetPostParams) => {
    try {
      const res = await postManagementAPI.getPosts(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deletePostAction = createAsyncThunk(
  'post/deletePost',
  async (payload: { id: number }, { fulfillWithValue }) => {
    try {
      const res = await postManagementAPI.deletePost(payload.id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getPostById = createAsyncThunk(
  'post/getPostById',
  async (payload: { id: number }, { fulfillWithValue }) => {
    try {
      const res = await postManagementAPI.getPostById(payload.id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const createPost = createAsyncThunk(
  'post/createPost',
  async (
    payload: Partial<IPostCreateForm> & {
      mediaIds?: number[]
      published?: boolean
      publishedDate?: string
    }
  ) => {
    try {
      const res = await postManagementAPI.createPost(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const editPost = createAsyncThunk(
  'post/editPost',
  async (
    payload: Partial<IPostCreateForm> & {
      mediaIds?: number[]
      id: string | number
      published?: boolean
      publishedDate?: string
    }
  ) => {
    try {
      const res = await postManagementAPI.editPost(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const uploadPostMedia = createAsyncThunk(
  'post/uploadPostMedia',
  async (
    payload: Partial<IPostCreateForm> & {
      mediaIds?: number[]
    }
  ) => {
    try {
      const res = await postManagementAPI.createPost(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const replyComment = createAsyncThunk(
  'post/replyComment',
  async (payload: { content: string; mediaId: number; id: number }) => {
    try {
      const res = await postManagementAPI.replyComments(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const postReaction = createAsyncThunk(
  'post/postReaction',
  async (payload: { type: string; postId?: number; commentId?: number }) => {
    try {
      const res = await postManagementAPI.postReaction(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getAllComments = createAsyncThunk(
  'post/getAllComments',
  async (payload: { id: number; page: number }, { fulfillWithValue }) => {
    try {
      const res = await postManagementAPI.getAllComments({
        id: payload.id,
        page: payload.page,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getChildComments = createAsyncThunk(
  'post/getChildComments',
  async (payload: { id: number; page: number }) => {
    try {
      const res = await postManagementAPI.getAllChildComments({
        id: payload.id,
        page: payload.page,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const getTags = createAsyncThunk('post/getTags', async () => {
  try {
    const res = await postManagementAPI.getTags()
    return res.data
  } catch (error) {
    throw error
  }
})
