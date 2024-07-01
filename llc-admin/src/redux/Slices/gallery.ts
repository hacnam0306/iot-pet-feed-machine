import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import {
  getImageMediaAction,
  getMediaAction,
  getVideoMediaAction,
} from '../actions/gallery'
import { IMediaItem } from 'src/interfaces/gallery'

import { unionBy } from 'lodash'

interface IGallery {
  loadings: Record<string, boolean | undefined>
  videos: IMediaItem[] | undefined
  images: IMediaItem[] | undefined
  totalVideos: number
  totalImages: number
  currentVideosPage: number
  currentImagesPage: number
  limitVideos: number
  limitImages: number
}

const initialState: IGallery = {
  loadings: {},
  videos: undefined,
  images: undefined,
  totalVideos: 0,
  totalImages: 0,
  currentVideosPage: 1,
  currentImagesPage: 1,
  limitVideos: 10,
  limitImages: 10,
}

const gallerySlice = createSlice({
  name: 'gallery',
  initialState,
  reducers: {
    clearVideos: (state) => {
      state.videos = undefined
      state.totalVideos = 0
      state.currentVideosPage = 1
      state.limitVideos = 10
    },
    clearImages: (state) => {
      state.images = undefined
      state.totalImages = 0
      state.currentImagesPage = 1
      state.limitImages = 10
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMediaAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_MEDIA_ACTION_LOADING] = true
    })
    builder.addCase(getMediaAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_MEDIA_ACTION_LOADING] = false
    })
    builder.addCase(getMediaAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_MEDIA_ACTION_LOADING] = false
    })
    // ------------------------------------
    builder.addCase(getVideoMediaAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_VIDEO_MEDIA_ACTION_LOADING] = true
    })
    builder.addCase(getVideoMediaAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_VIDEO_MEDIA_ACTION_LOADING] = false

      state.totalVideos = action.payload?.data?.total
      state.currentVideosPage = action.payload?.data?.page
      state.limitVideos = action.payload?.data?.limit

      // let tempVideos = state.videos || []
      // tempVideos = tempVideos.filter(
      //   (item) => item.category === action.meta.arg.category
      // )
      // state.videos = unionBy(tempVideos, action.payload?.data?.items, 'id')

      state.videos = action.payload?.data?.items
    })
    builder.addCase(getVideoMediaAction.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_VIDEO_MEDIA_ACTION_LOADING] = false
    })
    // ------------------------------------
    builder.addCase(getImageMediaAction.pending, (state, action) => {
      state.loadings[thunkActionLoading.GET_IMAGE_MEDIA_ACTION_LOADING] = true
    })
    builder.addCase(getImageMediaAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_IMAGE_MEDIA_ACTION_LOADING] = false

      state.totalImages = action.payload?.data?.total
      state.currentImagesPage = action.payload?.data?.page
      state.limitImages = action.payload?.data?.limit

      // let tempImages = state.images || []
      // tempImages = tempImages.filter(
      //   (item) => item.category === action.meta.arg.category
      // )
      // state.images = unionBy(tempImages, action.payload?.data?.items, 'id')

      state.images = action.payload?.data?.items
    })
    builder.addCase(getImageMediaAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_IMAGE_MEDIA_ACTION_LOADING] = false
    })
  },
})

export const galleryActions = {
  ...gallerySlice.actions,
}

export const selectGalleryLoading = (state: RootState, name: string) =>
  state.gallery.loadings[`${name}`]
export default gallerySlice.reducer
