import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IAddNewBlog,
  IBlogNewsItem,
  IResponseGetBlogDetail,
} from 'src/interfaces/blog'
import { IPackage } from 'src/interfaces/package-management'
import { RootState } from '.'
import { getPackageBenefitsAction } from '../actions/package-management'
import {
  addNewBlogAction,
  deleteBlogByIdAction,
  getAllAuthorsAction,
  getBlogDetailAction,
  getListBlogAction,
  updateBlogByIdAction,
  uploadThumbnailAction,
} from '../actions/blog-news'
import { ILoginResponse } from '@interfaces'

interface IBlogState {
  blogs: IBlogNewsItem[]
  authors: ILoginResponse[] | null
  totalBlogs: number
  pageBlogs: number | string
  limitBlogs: number | string
  selectedBlog?: IResponseGetBlogDetail
  loadings: Record<string, boolean | undefined>
  newBlog?: IAddNewBlog
}

const initialState: IBlogState = {
  blogs: [],
  authors: [],
  totalBlogs: 0,
  pageBlogs: 0,
  limitBlogs: 0,
  selectedBlog: {} as IResponseGetBlogDetail,
  loadings: {},
  newBlog: {} as IAddNewBlog,
}

const blogSlice = createSlice({
  name: 'blog',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListBlogAction.pending, (state) => {
      state.loadings[`getListBlogActionLoading`] = true
    })
    builder.addCase(getListBlogAction.fulfilled, (state, action) => {
      state.loadings[`getListBlogActionLoading`] = false
      state.blogs = action.payload.data.items
      state.totalBlogs = action.payload.data.total
      state.pageBlogs = action.payload.data.page
      state.limitBlogs = action.payload.data.limit
    })
    builder.addCase(getListBlogAction.rejected, (state) => {
      state.loadings[`getListBlogActionLoading`] = false
    })
    builder.addCase(uploadThumbnailAction.pending, (state) => {
      state.loadings[`uploadThumbnailActionLoading`] = true
    })
    builder.addCase(uploadThumbnailAction.fulfilled, (state, action) => {
      state.loadings[`uploadThumbnailActionLoading`] = false
      if (state?.newBlog) {
        state.newBlog.thumbnailId = action.payload?.data?.id
      }
    })
    builder.addCase(uploadThumbnailAction.rejected, (state) => {
      state.loadings[`uploadThumbnailActionLoading`] = false
    })
    builder.addCase(addNewBlogAction.pending, (state) => {
      state.loadings[`addNewBlogActionLoading`] = true
    })
    builder.addCase(addNewBlogAction.fulfilled, (state, action) => {
      state.loadings[`addNewBlogActionLoading`] = false
    })
    builder.addCase(addNewBlogAction.rejected, (state) => {
      state.loadings[`addNewBlogActionLoading`] = false
    })
    builder.addCase(getBlogDetailAction.pending, (state) => {
      state.loadings[`getBlogDetailActionLoading`] = true
    })
    builder.addCase(getBlogDetailAction.fulfilled, (state, action) => {
      state.loadings[`getBlogDetailActionLoading`] = false
      state.selectedBlog = action.payload.data
    })
    builder.addCase(getBlogDetailAction.rejected, (state) => {
      state.loadings[`getBlogDetailActionLoading`] = false
    })
    builder.addCase(updateBlogByIdAction.pending, (state) => {
      state.loadings[`updateBlogByIdActionLoading`] = true
    })
    builder.addCase(updateBlogByIdAction.fulfilled, (state, action) => {
      state.loadings[`updateBlogByIdActionLoading`] = false
    })
    builder.addCase(updateBlogByIdAction.rejected, (state) => {
      state.loadings[`updateBlogByIdActionLoading`] = false
    })
    builder.addCase(deleteBlogByIdAction.pending, (state) => {
      state.loadings[`deleteBlogByIdActionLoading`] = true
    })
    builder.addCase(deleteBlogByIdAction.fulfilled, (state, action) => {
      state.loadings[`deleteBlogByIdActionLoading`] = false
    })
    builder.addCase(deleteBlogByIdAction.rejected, (state) => {
      state.loadings[`deleteBlogByIdActionLoading`] = false
    })

    builder.addCase(getAllAuthorsAction.pending, (state) => {
      state.loadings[`getAllAuthorsActionLoading`] = true
    })
    builder.addCase(getAllAuthorsAction.fulfilled, (state, action) => {
      state.loadings[`getAllAuthorsActionLoading`] = false
      state.authors = action.payload
    })
    builder.addCase(getAllAuthorsAction.rejected, (state) => {
      state.loadings[`getAllAuthorsActionLoading`] = false
    })
  },
})

export const blogActions = {
  ...blogSlice.actions,
}

export const selectBlogLoading = (state: RootState, name: string) =>
  state.blog.loadings[`${name}Loading`]
export default blogSlice.reducer
