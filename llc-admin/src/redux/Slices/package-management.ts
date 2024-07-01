import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IPackage,
  IPackageBenefitsModule,
} from 'src/interfaces/package-management'
import { RootState } from '.'
import {
  createPackageAction,
  getPackageByIdAction,
  getListPackageAction,
  getPackageBenefitsAction,
  updatePackageAction,
  deletePackageAction,
} from '../actions/package-management'

interface IPackageState {
  packageBenefits: IPackageBenefitsModule[]
  packages: IPackage[]
  totalPackages: number
  pagePackages: number | string
  limitPackages: number | string
  selectedPackage?: IPackage
  loadings: Record<string, boolean | undefined>
}

const initialState: IPackageState = {
  packageBenefits: [],
  packages: [],
  totalPackages: 0,
  pagePackages: 0,
  limitPackages: 0,
  selectedPackage: undefined,
  loadings: {},
}

const packageSlice = createSlice({
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
    builder.addCase(getPackageBenefitsAction.pending, (state) => {
      state.loadings[`getPackageBenefitsActionLoading`] = true
    })
    builder.addCase(getPackageBenefitsAction.fulfilled, (state, action) => {
      state.loadings[`getPackageBenefitsActionLoading`] = false
      state.packageBenefits = action.payload.data
    })
    builder.addCase(getPackageBenefitsAction.rejected, (state) => {
      state.loadings[`getPackageBenefitsActionLoading`] = false
    })

    builder.addCase(getListPackageAction.pending, (state) => {
      state.loadings[`getListPackageActionLoading`] = true
    })
    builder.addCase(getListPackageAction.fulfilled, (state, action) => {
      state.loadings[`getListPackageActionLoading`] = false
      state.packages = action.payload.data?.items
      state.totalPackages = action.payload.data.total
      state.pagePackages = action.payload.data.page
      state.limitPackages = action.payload.data.limit
    })
    builder.addCase(getListPackageAction.rejected, (state) => {
      state.loadings[`getListPackageActionLoading`] = false
      state.packages = []
      state.totalPackages = 0
      state.pagePackages = 0
    })

    builder.addCase(createPackageAction.pending, (state) => {
      state.loadings[`createPackageActionLoading`] = true
    })
    builder.addCase(createPackageAction.fulfilled, (state) => {
      state.loadings[`createPackageActionLoading`] = false
    })
    builder.addCase(createPackageAction.rejected, (state) => {
      state.loadings[`createPackageActionLoading`] = false
    })

    builder.addCase(getPackageByIdAction.pending, (state) => {
      state.loadings[`getPackageByIdActionLoading`] = true
    })
    builder.addCase(getPackageByIdAction.fulfilled, (state, action) => {
      state.loadings[`getPackageByIdActionLoading`] = false
      state.selectedPackage = action.payload.data
    })
    builder.addCase(getPackageByIdAction.rejected, (state) => {
      state.loadings[`getPackageByIdActionLoading`] = false
    })

    builder.addCase(updatePackageAction.pending, (state) => {
      state.loadings[`updatePackageActionLoading`] = true
    })
    builder.addCase(updatePackageAction.fulfilled, (state) => {
      state.loadings[`updatePackageActionLoading`] = false
    })
    builder.addCase(updatePackageAction.rejected, (state) => {
      state.loadings[`updatePackageActionLoading`] = false
    })

    builder.addCase(deletePackageAction.pending, (state) => {
      state.loadings[`deletePackageActionLoading`] = true
    })
    builder.addCase(deletePackageAction.fulfilled, (state) => {
      state.loadings[`deletePackageActionLoading`] = false
    })
    builder.addCase(deletePackageAction.rejected, (state) => {
      state.loadings[`deletePackageActionLoading`] = false
    })
  },
})

export const packageActions = {
  ...packageSlice.actions,
}

export const selectPackageLoading = (state: RootState, name: string) =>
  state.package.loadings[`${name}Loading`]
export default packageSlice.reducer
