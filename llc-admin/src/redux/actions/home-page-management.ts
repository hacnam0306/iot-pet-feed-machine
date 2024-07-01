import { homePageManagement } from '@api'
import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  IHomeContentRequest,
  IHomePositionContent,
} from 'src/interfaces/aboutus-management'

export const getListContentHomePage = createAsyncThunk(
  'homepage/getContent',
  async () => {
    try {
      const res = await homePageManagement.getListContent()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteContentHomePage = createAsyncThunk(
  'homepage/deleteContent',
  async (id: number) => {
    try {
      const res = await homePageManagement.deleteContent(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const addNewContent = createAsyncThunk(
  'homepage/addContent',
  async (payload: Partial<IHomeContentRequest>) => {
    try {
      const res = await homePageManagement.addNewContent(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const editContent = createAsyncThunk(
  'homepage/addContent/edit',
  async (payload: Partial<IHomeContentRequest> & { id: number }) => {
    const { id, ...rest } = payload
    try {
      const res = await homePageManagement.editContent(id, rest)
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const editPositionContent = createAsyncThunk(
  'homepage/addContent/editPossition',
  async (payload: IHomePositionContent[]) => {
    try {
      const res = await homePageManagement.editPositionContent({
        homepages: payload,
      })
      return res.data
    } catch (error) {
      throw error
    }
  }
)
