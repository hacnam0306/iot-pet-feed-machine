import { HomePageContent } from './../../interfaces/aboutus-management'
import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '.'
import {
  addNewContent,
  deleteContentHomePage,
  editContent,
  getListContentHomePage,
} from '../actions'

interface IHabit {
  content: {
    data: HomePageContent[]
  }
  loadings: Record<string, boolean | undefined>
}
const initialState: IHabit = {
  content: {
    data: [],
  },

  loadings: {},
}

const homeContent = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListContentHomePage.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = true
    })
    builder.addCase(getListContentHomePage.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
      state.content.data = action.payload?.data
    })
    builder.addCase(getListContentHomePage.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
    })
    builder.addCase(deleteContentHomePage.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = true
    })
    builder.addCase(deleteContentHomePage.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
      const updateList = [...state.content.data]
      const newList = updateList.filter((item) => item.id !== action.meta?.arg)
      state.content.data = newList
    })
    builder.addCase(deleteContentHomePage.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
    })
    builder.addCase(addNewContent.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = true
    })
    builder.addCase(addNewContent.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
      const newList = [...state.content.data, action.payload.homepageSection]
      state.content.data = newList
    })
    builder.addCase(addNewContent.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
    })
    builder.addCase(editContent.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = true
    })
    builder.addCase(editContent.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
      const newList = [
        ...state.content.data.map((item) => {
          if (item.id === action.meta.arg.id) {
            return action.payload.homepageSection
          } else {
            return item
          }
        }),
      ]
      state.content.data = newList
    })
    builder.addCase(editContent.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_HOME_CONTENT] = false
    })
  },
})

export const homeContentActions = {
  ...homeContent.actions,
}

export const selectHomeContentLoading = (state: RootState, name: string) =>
  state.habit.loadings[`${name}`]
export default homeContent.reducer
