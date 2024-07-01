import { thunkActionLoading } from '@configs'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { TPostDetail } from 'src/interfaces/post-management'
import { getAllCategoriesAction } from 'src/redux/actions'
import { RootState } from '.'
import {
  deletePostAction,
  getPostById,
  getPostsAction,
  getAllComments,
  getChildComments,
} from '../actions/post-management'

interface IPost {
  post: {
    posts: TPostDetail[] | undefined
    limit: number
    page: number
    total: number
  }
  selectedPost?: TPostDetail
  replyingComment?: {
    commentId: number | null
    postId: number | null
  }
  tags?: any[]
  loadings: Record<string, boolean | undefined>
}

const initialState: IPost = {
  post: {
    posts: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  selectedPost: undefined,
  loadings: {},
  replyingComment: {
    commentId: null,
    postId: null,
  },
  tags: [],
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setReplyingComment: (
      state,
      action: PayloadAction<{
        commentId: null
        postId: null
      }>
    ) => {
      state.replyingComment = action.payload
    },
  },
  extraReducers: (builder) => {
    // Get posts
    builder.addCase(getPostsAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_POSTS_LOADING] = true
    })

    builder.addCase(getPostsAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_POSTS_LOADING] = false
      state.post.posts = action.payload?.data?.items
      state.post.limit = action.payload?.data?.limit
      state.post.page = action.payload?.data?.page
      state.post.total = action.payload?.data?.total
    })

    builder.addCase(getPostsAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_POSTS_LOADING] = false
    })

    // Delete post
    builder.addCase(deletePostAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_POST_LOADING] = true
    })

    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_POST_LOADING] = false
    })

    builder.addCase(deletePostAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_POST_LOADING] = false
    })

    builder.addCase(getPostById.pending, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_POST_DETAIL_LOADING] = true
    })
    builder.addCase(getPostById.fulfilled, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_POST_DETAIL_LOADING] = false
    })
    builder.addCase(getPostById.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_PACKAGE_POST_DETAIL_LOADING] = false
    })
    builder.addCase(getAllComments.pending, (state) => {
      state.loadings[thunkActionLoading.GET_COMMENTS] = true
    })
    builder.addCase(getAllComments.fulfilled, (state) => {
      state.loadings[thunkActionLoading.GET_COMMENTS] = false
    })
    builder.addCase(getAllComments.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_COMMENTS] = false
    })
    builder.addCase(getChildComments.pending, (state) => {
      state.loadings[thunkActionLoading.GET_CHILD_COMMENTS] = true
    })
    builder.addCase(getChildComments.fulfilled, (state) => {
      state.loadings[thunkActionLoading.GET_CHILD_COMMENTS] = false
    })
    builder.addCase(getChildComments.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_CHILD_COMMENTS] = false
    })
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.tags = action.payload as any
    })
  },
})

export const postActions = {
  ...postsSlice.actions,
}

export const selectPostLoading = (state: RootState, name: string) =>
  state.post.loadings[`${name}`]
export default postsSlice.reducer
