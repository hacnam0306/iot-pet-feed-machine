import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import {
  AboutUsLanding,
  IAboutUsPageSeo,
  ICommonContentDetail,
  ILandingFormData,
  IOurStoryItem,
} from 'src/interfaces/aboutus-management'
import { RootState } from '.'
import {
  addNewCEOQuotes,
  addNewCoreValues,
  addNewProviding,
  addNewSimpleQuote,
  createLandingAction,
  deleteCEOQuotes,
  deleteCoreValues,
  deleteOurStoryAction,
  deleteProviding,
  deleteSimpleQuote,
  getAboutUsPageSeoAction,
  getLandingAction,
  getListCEOQuotes,
  getListCoreValues,
  getListOurStoryAction,
  getListProviding,
  getListSimpleQuote,
  getOurMissionAction,
  getOurVisionAction,
  updateAboutUsPageSeoAction,
  updateCEOQuotes,
  updateCoreValues,
  updateOurMissionAction,
  updateOurStoryAction,
  updateOurVisionAction,
  updateProviding,
  updateSimpleQuote,
  uploadLandingImageAction,
} from '../actions'

interface IAboutusManagement {
  landing: AboutUsLanding | undefined
  providing: ICommonContentDetail[]
  ceoQuotes: ICommonContentDetail[] | null
  loadings: Record<string, boolean | undefined>
  ourStory: {
    listOurStory: IOurStoryItem | null
    selectedOurStory: IOurStoryItem | undefined
  }
  coreValues: ICommonContentDetail[]
  aboutUsPageSeo: IAboutUsPageSeo | undefined
  ourVision: ICommonContentDetail
  ourMission: ICommonContentDetail
}

const initialState: IAboutusManagement = {
  landing: undefined,
  providing: [],
  ceoQuotes: [],
  loadings: {},
  ourStory: {
    listOurStory: null,
    selectedOurStory: undefined,
  },
  coreValues: [],
  aboutUsPageSeo: undefined,
  ourVision: {} as ICommonContentDetail,
  ourMission: {} as ICommonContentDetail,
}

const aboutUsManagementSlice = createSlice({
  name: 'aboutUsManagement',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListProviding.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_PROVIDING_LOADING] = true
    })
    builder.addCase(getListProviding.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_PROVIDING_LOADING] = false
    })
    builder.addCase(getListProviding.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_PROVIDING_LOADING] = false
      state.providing = action.payload
    })
    builder.addCase(addNewProviding.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = true
    })
    builder.addCase(addNewProviding.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })
    builder.addCase(addNewProviding.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })
    builder.addCase(updateProviding.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = true
    })
    builder.addCase(updateProviding.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })
    builder.addCase(updateProviding.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })
    builder.addCase(deleteProviding.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = true
    })
    builder.addCase(deleteProviding.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })
    builder.addCase(deleteProviding.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_PROVIDING_LOADING] = false
    })

    ////LANDING
    builder.addCase(createLandingAction.rejected, (state) => {
      state.loadings[`createLandingActionLoading`] = false
    })
    builder.addCase(createLandingAction.fulfilled, (state, action) => {
      state.loadings[`createLandingActionLoading`] = false
      state.landing = action.payload.data
    })
    builder.addCase(createLandingAction.pending, (state) => {
      state.loadings[`createLandingActionLoading`] = true
    })
    builder.addCase(uploadLandingImageAction.pending, (state) => {
      state.loadings[`uploadLandingImageActionLoading`] = true
    })
    builder.addCase(uploadLandingImageAction.fulfilled, (state, action) => {
      state.loadings[`uploadLandingImageActionLoading`] = false
    })
    builder.addCase(uploadLandingImageAction.rejected, (state) => {
      state.loadings[`uploadLandingImageActionLoading`] = false
    })
    builder.addCase(getLandingAction.pending, (state) => {
      state.loadings[`getLandingActionLoading`] = true
    })
    builder.addCase(getLandingAction.fulfilled, (state, action) => {
      state.loadings[`getLandingActionLoading`] = false
      state.landing = action.payload.data
    })
    builder.addCase(getLandingAction.rejected, (state) => {
      state.loadings[`getLandingActionLoading`] = false
    })

    ////OUR STORY
    builder.addCase(getListOurStoryAction.pending, (state) => {
      state.loadings[`getListOurStoryActionLoading`] = true
    })
    builder.addCase(getListOurStoryAction.fulfilled, (state, action) => {
      state.loadings[`getListOurStoryActionLoading`] = false
      state.ourStory.listOurStory = action.payload.data
    })
    builder.addCase(getListOurStoryAction.rejected, (state) => {
      state.loadings[`getListOurStoryActionLoading`] = false
    })
    builder.addCase(updateOurStoryAction.pending, (state) => {
      state.loadings[`getListOurStoryActionLoading`] = true
    })
    builder.addCase(updateOurStoryAction.fulfilled, (state, action) => {
      state.loadings[`getListOurStoryActionLoading`] = false
      state.ourStory.selectedOurStory = action.payload.data.aboutUsOurStory
    })
    builder.addCase(updateOurStoryAction.rejected, (state) => {
      state.loadings[`getListOurStoryActionLoading`] = false
    })
    builder.addCase(deleteOurStoryAction.pending, (state) => {
      state.loadings[`deleteOurStoryActionLoading`] = true
    })
    builder.addCase(deleteOurStoryAction.fulfilled, (state, action) => {
      state.loadings[`deleteOurStoryActionLoading`] = false
    })
    builder.addCase(deleteOurStoryAction.rejected, (state) => {
      state.loadings[`deleteOurStoryActionLoading`] = false
    })
    ////Simple quotes
    builder.addCase(getListSimpleQuote.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_SIMPLE_QUOTE_LOADING] = true
    })
    builder.addCase(getListSimpleQuote.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(getListSimpleQuote.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_SIMPLE_QUOTE_LOADING] = false
      state.providing = action.payload
    })
    builder.addCase(addNewSimpleQuote.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = true
    })
    builder.addCase(addNewSimpleQuote.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(addNewSimpleQuote.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(updateSimpleQuote.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = true
    })
    builder.addCase(updateSimpleQuote.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(updateSimpleQuote.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(deleteSimpleQuote.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = true
    })
    builder.addCase(deleteSimpleQuote.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })
    builder.addCase(deleteSimpleQuote.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_SIMPLE_QUOTE_LOADING] = false
    })

    ////CEO Quotes
    builder.addCase(getListCEOQuotes.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CEO_QUOTES_LOADING] = true
    })
    builder.addCase(getListCEOQuotes.rejected, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(getListCEOQuotes.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CEO_QUOTES_LOADING] = false
      state.ceoQuotes = action.payload
    })
    builder.addCase(addNewCEOQuotes.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = true
    })
    builder.addCase(addNewCEOQuotes.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(addNewCEOQuotes.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(updateCEOQuotes.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = true
    })
    builder.addCase(updateCEOQuotes.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(updateCEOQuotes.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(deleteCEOQuotes.pending, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = true
    })
    builder.addCase(deleteCEOQuotes.rejected, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(deleteCEOQuotes.fulfilled, (state) => {
      state.loadings[thunkActionLoading.ADD_CEO_QUOTES_LOADING] = false
    })
    builder.addCase(getListCoreValues.pending, (state) => {
      state.loadings[`getListCoreValuesLoading`] = true
    })
    builder.addCase(getListCoreValues.fulfilled, (state, action) => {
      state.loadings[`getListCoreValuesLoading`] = false
      state.coreValues = action.payload.data
    })
    builder.addCase(getListCoreValues.rejected, (state) => {
      state.loadings[`getListCoreValuesLoading`] = false
    })
    builder.addCase(addNewCoreValues.pending, (state) => {
      state.loadings[`addNewCoreValuesLoading`] = true
    })
    builder.addCase(addNewCoreValues.fulfilled, (state, action) => {
      state.loadings[`addNewCoreValuesLoading`] = false
    })
    builder.addCase(addNewCoreValues.rejected, (state) => {
      state.loadings[`addNewCoreValuesLoading`] = false
    })
    builder.addCase(updateCoreValues.pending, (state) => {
      state.loadings[`updateCoreValuesLoading`] = true
    })
    builder.addCase(updateCoreValues.fulfilled, (state, action) => {
      state.loadings[`updateCoreValuesLoading`] = false
    })
    builder.addCase(updateCoreValues.rejected, (state) => {
      state.loadings[`updateCoreValuesLoading`] = false
    })
    builder.addCase(deleteCoreValues.pending, (state) => {
      state.loadings[`deleteCoreValuesLoading`] = true
    })
    builder.addCase(deleteCoreValues.fulfilled, (state, action) => {
      state.loadings[`deleteCoreValuesLoading`] = false
    })
    builder.addCase(deleteCoreValues.rejected, (state) => {
      state.loadings[`deleteCoreValuesLoading`] = false
    })
    builder.addCase(getAboutUsPageSeoAction.pending, (state) => {
      state.loadings[`getAboutUsPageSeoActionLoading`] = true
    })
    builder.addCase(getAboutUsPageSeoAction.fulfilled, (state, action) => {
      state.loadings[`getAboutUsPageSeoActionLoading`] = false
      state.aboutUsPageSeo = action.payload.data
    })
    builder.addCase(getAboutUsPageSeoAction.rejected, (state) => {
      state.loadings[`getAboutUsPageSeoActionLoading`] = false
    })
    builder.addCase(updateAboutUsPageSeoAction.pending, (state) => {
      state.loadings[`updateAboutUsPageSeoActionLoading`] = true
    })
    builder.addCase(updateAboutUsPageSeoAction.fulfilled, (state, action) => {
      state.loadings[`updateAboutUsPageSeoActionLoading`] = false
      state.aboutUsPageSeo = action.payload.data?.seoAboutUs?.metaData
    })
    builder.addCase(updateAboutUsPageSeoAction.rejected, (state) => {
      state.loadings[`updateAboutUsPageSeoActionLoading`] = false
    })
    builder.addCase(getOurVisionAction.pending, (state) => {
      state.loadings[`getOurVisionActionLoading`] = true
    })
    builder.addCase(getOurVisionAction.fulfilled, (state, action) => {
      state.loadings[`getOurVisionActionLoading`] = false
      state.ourVision = action.payload.data
    })
    builder.addCase(getOurVisionAction.rejected, (state) => {
      state.loadings[`getOurVisionActionLoading`] = false
    })

    builder.addCase(getOurMissionAction.pending, (state) => {
      state.loadings[`getOurMissionActionLoading`] = true
    })
    builder.addCase(getOurMissionAction.fulfilled, (state, action) => {
      state.loadings[`getOurMissionActionLoading`] = false
      state.ourMission = action.payload.data
    })
    builder.addCase(getOurMissionAction.rejected, (state) => {
      state.loadings[`getOurMissionActionLoading`] = false
    })
    builder.addCase(updateOurVisionAction.pending, (state) => {
      state.loadings[`updateOurVisionActionLoading`] = true
    })
    builder.addCase(updateOurVisionAction.fulfilled, (state, action) => {
      state.loadings[`updateOurVisionActionLoading`] = false
      state.ourVision = action.payload?.data?.aboutUsOurVision
    })
    builder.addCase(updateOurVisionAction.rejected, (state) => {
      state.loadings[`updateOurVisionActionLoading`] = false
    })

    builder.addCase(updateOurMissionAction.pending, (state) => {
      state.loadings[`updateOurMissionActionLoading`] = true
    })
    builder.addCase(updateOurMissionAction.fulfilled, (state, action) => {
      state.loadings[`updateOurMissionActionLoading`] = false
      state.ourVision = action.payload?.data?.aboutUsOurMission
    })
    builder.addCase(updateOurMissionAction.rejected, (state) => {
      state.loadings[`updateOurMissionActionLoading`] = false
    })
  },
})

export const aboutUsActions = {
  ...aboutUsManagementSlice.actions,
}

export const selectAboutUsLoading = (state: RootState, name: string) =>
  state.aboutUsManagement.loadings[`${name}`]
export default aboutUsManagementSlice.reducer
