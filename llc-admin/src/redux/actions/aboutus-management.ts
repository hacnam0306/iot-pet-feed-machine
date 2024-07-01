import { createAsyncThunk } from '@reduxjs/toolkit'
import { aboutUsManagementAPI } from 'src/api/aboutus-management'
import {
  IAddProvidingRequest,
  IAddLandingParams,
  IOurStoryFormData,
  IAddSimpleQuoteRequest,
  IAddCEOQuotesRequest,
  ICoreValueFormData,
  ISeoMetaData,
  IOurVisionFormData,
} from 'src/interfaces/aboutus-management'
import { blogManagementAPI } from 'src/api/blog-news'

export const getListProviding = createAsyncThunk(
  'aboutUs-managemant/providing/getList',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getListProviding()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const addNewProviding = createAsyncThunk(
  'aboutUs-managemant/providing/addNew',
  async (payload: Partial<IAddProvidingRequest>) => {
    try {
      const res = await aboutUsManagementAPI.addNewProviding(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateProviding = createAsyncThunk(
  'aboutUs-managemant/providing/update',
  async (data: Partial<IAddProvidingRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await aboutUsManagementAPI.updateProviding(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteProviding = createAsyncThunk(
  'aboutUs-managemant/providing/delete',
  async (id?: number) => {
    try {
      const res = await aboutUsManagementAPI.deleteProviding(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

// Landing

export const createLandingAction = createAsyncThunk(
  'aboutUs-management/landing/create',
  async (params: IAddLandingParams) => {
    try {
      const res = await aboutUsManagementAPI.createLanding(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const uploadLandingImageAction = createAsyncThunk(
  'aboutUs-management/landing/uploadImage',
  async (file: File) => {
    try {
      const res = await blogManagementAPI.uploadMedia(file)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getLandingAction = createAsyncThunk(
  'aboutUs-management/landing/get',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getLanding()
      return res
    } catch (error) {
      throw error
    }
  }
)

// Our Story

export const getListOurStoryAction = createAsyncThunk(
  'aboutUs-management/ourStory/getList',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getListOurStory()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createOutStoryAction = createAsyncThunk(
  'aboutUs-management/ourStory/create',
  async (params: IOurStoryFormData) => {
    try {
      const res = await aboutUsManagementAPI.createOutStory(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateOurStoryAction = createAsyncThunk(
  'aboutUs-management/ourStory/update',
  async ({ params, itemId }: { params: IOurStoryFormData; itemId: number }) => {
    try {
      const res = await aboutUsManagementAPI.updateOurStory(itemId, params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteOurStoryAction = createAsyncThunk(
  'aboutUs-management/ourStory/delete',
  async (itemId: number) => {
    try {
      const res = await aboutUsManagementAPI.deleteOurStory(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)

////Simple Quotes
export const getListSimpleQuote = createAsyncThunk(
  'aboutUs-managemant/SimpleQuote/getList',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getListSimpleQuote()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const addNewSimpleQuote = createAsyncThunk(
  'aboutUs-managemant/SimpleQuote/addNew',
  async (payload: Partial<IAddSimpleQuoteRequest>) => {
    try {
      const res = await aboutUsManagementAPI.addNewSimpleQuote(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateSimpleQuote = createAsyncThunk(
  'aboutUs-managemant/SimpleQuote/update',
  async (data: Partial<IAddSimpleQuoteRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await aboutUsManagementAPI.updateSimpleQuote(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteSimpleQuote = createAsyncThunk(
  'aboutUs-managemant/SimpleQuote/delete',
  async (id?: number) => {
    try {
      const res = await aboutUsManagementAPI.deleteSimpleQuote(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
////CEO Quotes
export const getListCEOQuotes = createAsyncThunk(
  'aboutUs-managemant/CEOQuotes/getList',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getListCEOQuotes()
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const addNewCEOQuotes = createAsyncThunk(
  'aboutUs-managemant/CEOQuotes/addNew',
  async (payload: Partial<IAddCEOQuotesRequest>) => {
    try {
      const res = await aboutUsManagementAPI.addNewCEOQuotes(payload)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const updateCEOQuotes = createAsyncThunk(
  'aboutUs-managemant/CEOQuotes/update',
  async (data: Partial<IAddCEOQuotesRequest & { id: number }>) => {
    try {
      const id = data.id
      delete data.id
      const res = await aboutUsManagementAPI.updateCEOQuotes(data, id)
      return res.data
    } catch (error) {
      throw error
    }
  }
)

export const deleteCEOQuotes = createAsyncThunk(
  'aboutUs-managemant/CEOQuotes/delete',
  async (id?: number) => {
    try {
      const res = await aboutUsManagementAPI.deleteCEOQuotes(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

// Core Values
export const getListCoreValues = createAsyncThunk(
  'aboutUs-managemant/CoreValues/getList',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getListCoreValue()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const addNewCoreValues = createAsyncThunk(
  'aboutUs-managemant/CoreValues/addNew',
  async (payload: Partial<ICoreValueFormData>) => {
    try {
      const res = await aboutUsManagementAPI.addNewCoreValue(payload)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateCoreValues = createAsyncThunk(
  'aboutUs-managemant/CoreValues/update',
  async ({ params, itemId }: { params: IOurStoryFormData; itemId: number }) => {
    try {
      const res = await aboutUsManagementAPI.updateCoreValue(params, itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteCoreValues = createAsyncThunk(
  'aboutUs-managemant/CoreValues/delete',
  async (itemId: number) => {
    try {
      const res = await aboutUsManagementAPI.deleteCoreValue(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)

// SEO
export const getAboutUsPageSeoAction = createAsyncThunk(
  'aboutUs-managemant/seo/get',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getAboutUsPageSeo()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateAboutUsPageSeoAction = createAsyncThunk(
  'aboutUs-managemant/seo/update',
  async (params: Partial<ISeoMetaData>) => {
    try {
      const res = await aboutUsManagementAPI.updateAboutUsPageSeo(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getOurVisionAction = createAsyncThunk(
  'aboutUs-managemant/ourVision/get',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getOurVision()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getOurMissionAction = createAsyncThunk(
  'aboutUs-managemant/ourMIssion/get',
  async () => {
    try {
      const res = await aboutUsManagementAPI.getOurMission()
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateOurVisionAction = createAsyncThunk(
  'aboutUs-managemant/ourVision/update',
  async (params: Partial<IOurVisionFormData>) => {
    try {
      const res = await aboutUsManagementAPI.addUpdateOurVision(params)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateOurMissionAction = createAsyncThunk(
  'aboutUs-managemant/ourMIssion/update',
  async (params: Partial<IOurVisionFormData>) => {
    try {
      const res = await aboutUsManagementAPI.addUpdateOurMission(params)
      return res
    } catch (error) {
      throw error
    }
  }
)
