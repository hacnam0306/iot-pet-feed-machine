import { thunkActionType } from '@configs'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { galleryAPI } from 'src/api/gallery'
import { IRequestGetMedia } from 'src/interfaces/gallery'

export const getMediaAction = createAsyncThunk(
  thunkActionType.GET_MEDIA_ACTION,
  async (payload: IRequestGetMedia) => {
    try {
      const res = await galleryAPI.getMedia(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getVideoMediaAction = createAsyncThunk(
  thunkActionType.GET_VIDEO_MEDIA_ACTION,
  async (payload: { params: any; category: any }) => {
    try {
      const res = await galleryAPI.getVideos(payload.params)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getImageMediaAction = createAsyncThunk(
  thunkActionType.GET_IMAGE_MEDIA_ACTION,
  async (payload: { params: any; category: any }) => {
    try {
      const res = await galleryAPI.getImages(payload.params)
      return res
    } catch (error) {
      throw error
    }
  }
)
