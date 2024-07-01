import { createAsyncThunk } from '@reduxjs/toolkit'
import { categoryManagementAPI } from 'src/api/category-management'

export const getAllCategoriesAction = createAsyncThunk(
  'category/getCategoriesAction',
  async () => {
    try {
      const res = await categoryManagementAPI.getCategories()
      return res.data
    } catch (error) {
      throw error
    }
  }
)
export const deleteCategoryAction = createAsyncThunk(
  'category/deleteCategoryAction',
  async (id: number) => {
    try {
      const res = await categoryManagementAPI.deleteCategory(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

//
export const deleteSubCategoryAction = createAsyncThunk(
  'category/deleteSubCategoryAction',
  async (id: number) => {
    try {
      const res = await categoryManagementAPI.deleteSubCategory(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const updateCategoryAction = createAsyncThunk(
  'category/updateCategoryAction',
  async (data: {
    id: number
    name: string
    nameInDutch: string
    slug: string
  }) => {
    try {
      const res = await categoryManagementAPI.updateCategory(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const updateSubCategoryAction: any = createAsyncThunk(
  'category/updateSubCategoryAction',
  async (data: {
    id: number
    name: string
    categoryId: number
    slug: string
  }) => {
    try {
      const res = await categoryManagementAPI.updateSubCategory(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const addSubCategoryAction: any = createAsyncThunk(
  'category/addSubCategoryAction',
  async (data: { name: string; categoryId: number; slug: string }) => {
    try {
      const res = await categoryManagementAPI.addSubCategories(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const addCategoryAction: any = createAsyncThunk(
  'category/addCategoryAction',
  async (data: { name: string; nameInDutch: string; slug: string }) => {
    try {
      const res = await categoryManagementAPI.addCategory(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
