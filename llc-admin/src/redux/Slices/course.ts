import {
  AboutUsLanding,
  IAboutUsPageSeo,
} from './../../interfaces/aboutus-management'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IAddNewCourse,
  ICourseItem,
  IResponseGetCourseDetail,
} from 'src/interfaces/course'
import { IPackage } from 'src/interfaces/package-management'
import { RootState } from '.'
import { getPackageBenefitsAction } from '../actions/package-management'

import {
  createLandingCourseAction,
  duplicateCourseByIdAction,
  // addNewCourseAction,  //TODO
  // deleteCourseByIdAction,  //TODO
  getCourseDetailAction,
  getCoursePageSeoAction,
  getLandingCourseAction,
  getListCourseAction,
  highLightByIdAction,
  updateCoursePageSeoAction,
  // updateCourseByIdAction,  //TODO
  // uploadThumbnailAction,
} from '../actions/course'

interface ICourseState {
  courses: ICourseItem[]
  landing: AboutUsLanding | undefined
  totalHighlight: number
  totalCourses: number
  pageCourses: number | string
  limitCourses: number | string
  selectedCourse?: IResponseGetCourseDetail
  loadings: Record<string, boolean | undefined>
  newCourse?: IAddNewCourse
  aboutUsPageSeo: IAboutUsPageSeo | undefined
}

const initialState: ICourseState = {
  landing: undefined,
  courses: [],
  totalCourses: 0,
  pageCourses: 0,
  limitCourses: 0,
  totalHighlight: 0,
  selectedCourse: {} as IResponseGetCourseDetail,
  loadings: {},
  newCourse: {} as IAddNewCourse,
  aboutUsPageSeo: undefined,
}

const courseSlice = createSlice({
  name: 'course',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListCourseAction.pending, (state) => {
      state.loadings[`getListCourseActionLoading`] = true
    })
    builder.addCase(getListCourseAction.fulfilled, (state, action) => {
      state.loadings[`getListCourseActionLoading`] = false
      state.courses = action.payload.data.items
      state.totalCourses = action.payload.data.total
      state.totalHighlight = action.payload.data?.totalHighlight || 0
      state.pageCourses = action.payload.data.page
      state.limitCourses = action.payload.data.limit
    })
    builder.addCase(getListCourseAction.rejected, (state) => {
      state.loadings[`getListCourseActionLoading`] = false
    })
    builder.addCase(getLandingCourseAction.pending, (state) => {
      state.loadings[`getLandingCourseActionLoading`] = true
    })
    builder.addCase(getLandingCourseAction.fulfilled, (state, action) => {
      state.loadings[`getLandingCourseActionLoading`] = false
      state.landing = action.payload.data
    })
    builder.addCase(getLandingCourseAction.rejected, (state) => {
      state.loadings[`getLandingCourseActionLoading`] = false
    })
    builder.addCase(getCourseDetailAction.pending, (state) => {
      state.loadings[`getCourseDetailActionLoading`] = true
    })
    builder.addCase(getCourseDetailAction.fulfilled, (state, action) => {
      state.loadings[`getCourseDetailActionLoading`] = false
      state.selectedCourse = action.payload.data
    })
    builder.addCase(getCourseDetailAction.rejected, (state) => {
      state.loadings[`getCourseDetailActionLoading`] = false
    })
    builder.addCase(createLandingCourseAction.rejected, (state) => {
      state.loadings[`createLandingCourseActionLoading`] = false
    })
    builder.addCase(createLandingCourseAction.fulfilled, (state, action) => {
      state.loadings[`createLandingCourseActionLoading`] = false
      state.landing = action.payload.data
    })
    builder.addCase(createLandingCourseAction.pending, (state) => {
      state.loadings[`createLandingActionLoading`] = true
    })
    builder.addCase(highLightByIdAction.rejected, (state) => {
      state.loadings[`highLightByIdActionLoading`] = false
    })
    builder.addCase(highLightByIdAction.fulfilled, (state, action) => {
      const currentCourses = [...state.courses]
      const currentHighlightCourses = (action.payload.data as any)
        .highlightCourses

      state.totalHighlight = currentHighlightCourses.length

      state.courses = currentCourses.map((course) => {
        if (course.id === +action.meta?.arg) {
          return {
            ...course,
            isHighlighted: !course.isHighlighted,
          }
        } else {
          return {
            ...course,
            isHighlighted: currentHighlightCourses.includes(course.id),
          }
        }
      })
    })
    builder.addCase(highLightByIdAction.pending, (state) => {
      state.loadings[`createLandingActionLoading`] = true
    })
    // TODO
    // builder.addCase(updateCourseByIdAction.pending, (state) => {
    //   state.loadings[`updateCourseByIdActionLoading`] = true
    // })
    // builder.addCase(updateCourseByIdAction.fulfilled, (state, action) => {
    //   state.loadings[`updateCourseByIdActionLoading`] = false
    // })
    // builder.addCase(updateCourseByIdAction.rejected, (state) => {
    //   state.loadings[`updateCourseByIdActionLoading`] = false
    // })
    // builder.addCase(deleteCourseByIdAction.pending, (state) => {
    //   state.loadings[`deleteCourseByIdActionLoading`] = true
    // })
    // builder.addCase(deleteCourseByIdAction.fulfilled, (state, action) => {
    //   state.loadings[`deleteCourseByIdActionLoading`] = false
    // })
    // builder.addCase(deleteCourseByIdAction.rejected, (state) => {
    //   state.loadings[`deleteCourseByIdActionLoading`] = false
    // })
    builder.addCase(getCoursePageSeoAction.pending, (state) => {
      state.loadings[`getCoursePageSeoActionLoading`] = true
    })
    builder.addCase(getCoursePageSeoAction.fulfilled, (state, action) => {
      state.loadings[`getCoursePageSeoActionLoading`] = false
      state.aboutUsPageSeo = action.payload.data
    })
    builder.addCase(getCoursePageSeoAction.rejected, (state) => {
      state.loadings[`getCoursePageSeoActionLoading`] = false
    })
    builder.addCase(updateCoursePageSeoAction.pending, (state) => {
      state.loadings[`updateCoursePageSeoActionLoading`] = true
    })
    builder.addCase(updateCoursePageSeoAction.fulfilled, (state, action) => {
      state.loadings[`updateCoursePageSeoActionLoading`] = false
      state.aboutUsPageSeo = action.payload.data?.seoAboutUs?.metaData
    })
    builder.addCase(updateCoursePageSeoAction.rejected, (state) => {
      state.loadings[`updateCoursePageSeoActionLoading`] = false
    })
    builder.addCase(duplicateCourseByIdAction.pending, (state) => {
      state.loadings[`duplicateCourseByIdActionLoading`] = true
    })
    builder.addCase(duplicateCourseByIdAction.fulfilled, (state, action) => {
      state.loadings[`duplicateCourseByIdActionLoading`] = false
    })
    builder.addCase(duplicateCourseByIdAction.rejected, (state) => {
      state.loadings[`getCourseDetailActionLoading`] = false
    })
  },
})

export const courseActions = {
  ...courseSlice.actions,
}

export const selectCourseLoading = (state: RootState, name: string) =>
  state.course.loadings[`${name}Loading`]
export default courseSlice.reducer
