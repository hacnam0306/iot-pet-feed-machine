import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IResponseDetailSeoConfig } from 'src/interfaces/seo-config'
import { IPackage } from 'src/interfaces/package-management'
import { RootState } from '.'
import { getPackageBenefitsAction } from '../actions/package-management'
import {
  getSeoConfigByCourse,
  updateSeoConfigByCourseId,
} from '../actions/seo-config'
import { thunkActionLoading } from '@configs'

interface ISeoConfigState {
  seoConfig: IResponseDetailSeoConfig
  loadings: Record<string, boolean | undefined>
}

const initialState: ISeoConfigState = {
  seoConfig: {} as IResponseDetailSeoConfig,
  loadings: {},
}

const seoConfigSlice = createSlice({
  name: 'seo-config',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSeoConfigByCourse.pending, (state) => {
      state.loadings[thunkActionLoading.GET_SEO_CONFIG_LOADING] = true
    })
    builder.addCase(getSeoConfigByCourse.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_SEO_CONFIG_LOADING] = false
      state.seoConfig = action.payload.data
    })
    builder.addCase(getSeoConfigByCourse.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_SEO_CONFIG_LOADING] = false
    })
    builder.addCase(updateSeoConfigByCourseId.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_SEO_CONFIG_LOADING] = true
    })
    builder.addCase(updateSeoConfigByCourseId.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_SEO_CONFIG_LOADING] = false
    })
    builder.addCase(updateSeoConfigByCourseId.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_SEO_CONFIG_LOADING] = false
    })
  },
})

export const seoConfigActions = {
  ...seoConfigSlice.actions,
}

export const selectSeoConfigLoading = (state: RootState, name: string) =>
  state.seoConfig.loadings[`${name}Loading`]
export default seoConfigSlice.reducer
