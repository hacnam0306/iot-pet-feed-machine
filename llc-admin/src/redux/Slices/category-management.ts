import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import { ICategory } from 'src/interfaces/category-management'
import { RootState } from '.'
import {
  deleteCategoryAction,
  getAllCategoriesAction,
} from '../actions/category-management'
import { flatMap } from 'lodash'

interface ICategories {
  categories: ICategory[]
  listSubCategory: ICategory[]
  loadings: Record<string, boolean | undefined>
}

const initialState: ICategories = {
  categories: [],
  loadings: {},
  listSubCategory: [],
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategoriesAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CATEGORIES] = true
    })
    builder.addCase(getAllCategoriesAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CATEGORIES] = false
    })
    builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CATEGORIES] = false
      state.categories = action.payload
      state.listSubCategory = flatMap(
        action.payload?.map((item: ICategory) =>
          item.subCategories.map((_item) => ({
            ..._item,
            parentCategory: item.name,
            parentCategoryId: item.id,
          }))
        )
      )
    })
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_CATEGORIES] = true
    })
    builder.addCase(deleteCategoryAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_CATEGORIES] = false
    })
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_CATEGORIES] = false
    })
  },
})

export const categoriesActions = {
  ...categoriesSlice.actions,
}

export const selectCategoryLoading = (state: RootState, name: string) =>
  state.categories.loadings[`${name}`]
export default categoriesSlice.reducer
