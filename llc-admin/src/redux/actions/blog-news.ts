import { INITIAL_PAGINATION_SiZE } from '@configs'
import { IFetchUsersParams } from '@interfaces'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { blogManagementAPI } from 'src/api/blog-news'
import { IBlogParams } from 'src/interfaces/blog'

export const getListBlogAction = createAsyncThunk(
  'blog/getListBlogAction',
  async ({ limit = 10, ...otherParams }: IBlogParams) => {
    try {
      const res = await blogManagementAPI.getListBlog({
        limit,
        ...otherParams,
      })
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getAllAuthorsAction = createAsyncThunk(
  'blog/getAllAuthorsAction',
  async (params?: IFetchUsersParams) => {
    try {
      const localParams = params
        ? params
        : {
            page: 1,
            limit: INITIAL_PAGINATION_SiZE,
          }
      const admins = await blogManagementAPI.getAuthorAdmins(localParams)
      const teachers = await blogManagementAPI.getAuthorTeachers(localParams)

      return [...admins.data.items, ...teachers.data.items]
    } catch (error) {
      throw error
    }
  }
)

export const uploadThumbnailAction = createAsyncThunk(
  'blog/uploadThumbnailAction',
  async (file: File) => {
    try {
      const res = await blogManagementAPI.uploadMedia(file)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const addNewBlogAction = createAsyncThunk(
  'blog/addNewBlogAction',
  async (params: any) => {
    try {
      const res = await blogManagementAPI.addNewBlog(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getBlogDetailAction = createAsyncThunk(
  'blog/getBlogDetailAction',
  async (blogId: string) => {
    try {
      const res = await blogManagementAPI.getBlogDetail(blogId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateBlogByIdAction = createAsyncThunk(
  'blog/updateBlogByIdAction',
  async ({ blogId, params }: any) => {
    try {
      const res = await blogManagementAPI.updateBlogById(blogId, params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteBlogByIdAction = createAsyncThunk(
  'blog/deleteBlogByIdAction',
  async (blogId: string | number) => {
    try {
      const res = await blogManagementAPI.deleteBlogById(blogId)
      return res
    } catch (error) {
      throw error
    }
  }
)
