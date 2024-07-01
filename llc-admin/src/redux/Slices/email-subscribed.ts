import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IPackage } from 'src/interfaces/package-management'
import { RootState } from '.'
import { getListEmailSubscribedAction } from '../actions/email-subscribed'

interface ISubscribed {
  emails: IPackage[]
  total: number
  page: number | string
  limit: number | string
  selectedPackage?: IPackage
  loadings: Record<string, boolean | undefined>
}

const initialState: ISubscribed = {
  emails: [],
  total: 0,
  page: 0,
  limit: 0,
  selectedPackage: undefined,
  loadings: {},
}

const emailSubSlice = createSlice({
  name: 'package',
  initialState: initialState,
  reducers: {
    setSelectedPackage: (
      state,
      action: PayloadAction<IPackage | undefined>
    ) => {
      state.selectedPackage = action.payload
        ? {
            ...(state.selectedPackage || {}),
            ...action.payload,
          }
        : undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getListEmailSubscribedAction.pending, (state) => {
      state.loadings[`getListEmailSubscribedActionLoading`] = true
    })
    builder.addCase(getListEmailSubscribedAction.fulfilled, (state, action) => {
      state.loadings[`getListEmailSubscribedActionLoading`] = false
      state.emails = action.payload.data.items
      state.total = action.payload.data.total
      state.page = action.payload.data.page
      state.limit = action.payload.data.limit
    })
    builder.addCase(getListEmailSubscribedAction.rejected, (state) => {
      state.loadings[`getListEmailSubscribedActionLoading`] = false
      state.emails = []
      state.total = 0
      state.page = 0
    })
  },
})

export const packageActions = {
  ...emailSubSlice.actions,
}

export const selectEmailSubLoading = (state: RootState, name: string) =>
  state.package.loadings[`${name}Loading`]
export default emailSubSlice.reducer
