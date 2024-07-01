import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import {
  IAddNewLesson,
  ILessonItem,
  IResponseGetLessonDetail,
} from 'src/interfaces/lesson'
import { IPackage } from 'src/interfaces/package-management'
import { RootState } from '.'
import { getPackageBenefitsAction } from '../actions/package-management'

import {
  createLesson,
  deleteLessonAction,
  getLessonById,
  editLesson,
  uploadLessonMedia,
} from '../actions/lesson-management'

interface ILessonState {
  lessons: ILessonItem[]
  totalLessons: number
  pageLessons: number | string
  limitLessons: number | string
  selectedLesson?: IResponseGetLessonDetail
  loadings: Record<string, boolean | undefined>
  newLesson?: IAddNewLesson
}

const initialState: ILessonState = {
  lessons: [],
  totalLessons: 0,
  pageLessons: 0,
  limitLessons: 0,
  selectedLesson: {} as IResponseGetLessonDetail,
  loadings: {},
  newLesson: {} as IAddNewLesson,
}

const lessonSlice = createSlice({
  name: 'lesson',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // TODO
    // builder.addCase(uploadThumbnailAction.pending, (state) => {
    //   state.loadings[`uploadThumbnailActionLoading`] = true
    // })

    // builder.addCase(uploadThumbnailAction.fulfilled, (state, action) => {
    //   state.loadings[`uploadThumbnailActionLoading`] = false
    //   if (state?.newCourse) {
    //     state.newCourse.thumbnailId = action.payload?.data?.id
    //   }
    // })
    // builder.addCase(uploadThumbnailAction.rejected, (state) => {
    //   state.loadings[`uploadThumbnailActionLoading`] = false
    // })

    builder.addCase(createLesson.pending, (state) => {
      state.loadings[`createLessonLoading`] = true
    })
    builder.addCase(createLesson.fulfilled, (state, action) => {
      state.loadings[`createLessonLoading`] = false
    })
    builder.addCase(createLesson.rejected, (state) => {
      state.loadings[`createLessonLoading`] = false
    })
    // builder.addCase(getCourseDetailAction.pending, (state) => {
    //   state.loadings[`getCourseDetailActionLoading`] = true
    // })
    // builder.addCase(getCourseDetailAction.fulfilled, (state, action) => {
    //   state.loadings[`getCourseDetailActionLoading`] = false
    //   state.selectedCourse = action.payload.data
    // })
    // builder.addCase(getCourseDetailAction.rejected, (state) => {
    //   state.loadings[`getCourseDetailActionLoading`] = false
    // })
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
  },
})

export const lessonActions = {
  ...lessonSlice.actions,
}

export const selectLessonLoading = (state: RootState, name: string) =>
  state.lesson.loadings[`${name}Loading`]
export default lessonSlice.reducer
