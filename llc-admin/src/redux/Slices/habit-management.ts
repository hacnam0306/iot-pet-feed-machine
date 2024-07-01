import {
  deleteChallenge,
  deleteDailyRoutineAction,
  deleteJobDetailDailyRoutineAction,
  duplicateChallengeAction,
  getDetailDailyRoutineAction,
  getJobDetailDailyRoutineAction,
  getListDailyRoutineAction,
  getListJobsDailyRoutineAction,
  postDetailDailyRoutineAction,
  putDetailDailyRoutineAction,
  putJobDetailDailyRoutineAction,
} from './../actions/habit-management'
import { thunkActionLoading } from '@configs'
import { createSlice } from '@reduxjs/toolkit'
import {
  IChallengeItem,
  IGoalItem,
  IQuestionItem,
  IRoutineItem,
  TJobRoutineItem,
} from 'src/interfaces/habit-management'
import { RootState } from '.'
import {
  createGoalAction,
  deleteGoalAction,
  updateGoalAction,
  getListChallengerAction,
  getListGoalsAction,
  getListQuestionAction,
  deleteQuestionAction,
  createQuestionAction,
  updateQuestionAction,
} from '../actions/habit-management'

interface IHabit {
  goal: {
    goals: IGoalItem[] | undefined
    limit: number
    page: number
    total: number
  }
  challenges: {
    challenges: IChallengeItem[]
    limit: number
    page: number
    total: number
  }
  question: {
    questions: IQuestionItem[] | undefined
    limit: number
    page: number
    total: number
  }
  routine: {
    routines: IRoutineItem[] | undefined
    limit: number
    page: number
    total: number
  }

  job: {
    jobs: TJobRoutineItem[] | undefined
    limit: number
    page: number
    total: number
  }
  loadings: Record<string, boolean | undefined>
}

const initialState: IHabit = {
  goal: {
    goals: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  challenges: {
    challenges: [],
    limit: 10,
    page: 1,
    total: 0,
  },
  question: {
    questions: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  routine: {
    routines: undefined,
    limit: 0,
    page: 0,
    total: 0,
  },
  job: {
    jobs: [],
    limit: 0,
    page: 0,
    total: 0,
  },
  loadings: {},
}

const habitSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getListGoalsAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_GOALS_LOADING] = true
    })

    builder.addCase(getListGoalsAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_GOALS_LOADING] = false
      state.goal.goals = action.payload?.data?.items
      state.goal.limit = action.payload?.data?.limit
      state.goal.page = action.payload?.data?.page
      state.goal.total = action.payload?.data?.total
    })

    builder.addCase(getListGoalsAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_GOALS_LOADING] = false
    })

    // create goal
    builder.addCase(createGoalAction.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_GOAL_LOADING] = true
    })

    builder.addCase(createGoalAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_GOAL_LOADING] = false
    })

    builder.addCase(createGoalAction.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_GOAL_LOADING] = false
    })

    // update goal
    builder.addCase(updateGoalAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_GOAL_LOADING] = true
    })

    builder.addCase(updateGoalAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_GOAL_LOADING] = false
      const updatedGoalIndex = state.goal.goals?.findIndex(
        (item) => item.id === action.payload.data.updatedGoal.id
      )
      if (
        updatedGoalIndex !== undefined &&
        updatedGoalIndex >= 0 &&
        state.goal.goals
      ) {
        state.goal.goals[updatedGoalIndex] = {
          ...state.goal.goals[updatedGoalIndex],
          ...action.payload.data.updatedGoal,
        }
      }
    })

    builder.addCase(updateGoalAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_GOAL_LOADING] = false
    })

    // delete goal
    builder.addCase(deleteGoalAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_GOAL_LOADING] = true
    })

    builder.addCase(deleteGoalAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_GOAL_LOADING] = false
    })

    builder.addCase(deleteGoalAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_GOAL_LOADING] = false
    })

    // get list question
    builder.addCase(getListQuestionAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_QUESTIONS_LOADING] = true
    })
    builder.addCase(getListQuestionAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_QUESTIONS_LOADING] = false
      state.question.questions = action.payload?.data?.items
      state.question.limit = action.payload?.data?.limit
      state.question.page = action.payload?.data?.page
      state.question.total = action.payload?.data?.total
    })
    builder.addCase(getListQuestionAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_QUESTIONS_LOADING] = false
    })

    // create question
    builder.addCase(createQuestionAction.pending, (state) => {
      state.loadings[thunkActionLoading.CREATE_QUESTION_LOADING] = true
    })

    builder.addCase(createQuestionAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.CREATE_QUESTION_LOADING] = false
    })

    builder.addCase(createQuestionAction.rejected, (state) => {
      state.loadings[thunkActionLoading.CREATE_QUESTION_LOADING] = false
    })

    // update question
    builder.addCase(updateQuestionAction.pending, (state) => {
      state.loadings[thunkActionLoading.UPDATE_QUESTION_LOADING] = true
    })

    builder.addCase(updateQuestionAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.UPDATE_QUESTION_LOADING] = false
    })

    builder.addCase(updateQuestionAction.rejected, (state) => {
      state.loadings[thunkActionLoading.UPDATE_QUESTION_LOADING] = false
    })
    // delete question
    builder.addCase(deleteQuestionAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_QUESTION_LOADING] = true
    })

    builder.addCase(deleteQuestionAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_QUESTION_LOADING] = false
    })

    builder.addCase(deleteQuestionAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_QUESTION_LOADING] = false
    })

    // get list challenger
    builder.addCase(getListChallengerAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = true
    })

    builder.addCase(getListChallengerAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = false
      state.challenges.challenges = action.payload.data.items
      state.challenges.limit = action.payload.data.limit
      state.challenges.page = action.payload.data.page
      state.challenges.total = action.payload.data.total
    })

    builder.addCase(getListChallengerAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = false
    })
    builder.addCase(duplicateChallengeAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = true
    })

    builder.addCase(duplicateChallengeAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = false
    })

    builder.addCase(duplicateChallengeAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES_LOADING] = false
    })

    // get list routine
    builder.addCase(getListDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_DAILY_ROUTINES_LOADING] = true
    })

    builder.addCase(getListDailyRoutineAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_DAILY_ROUTINES_LOADING] = false
      state.routine.routines = action.payload.data.items
      state.routine.limit = action.payload.data.limit
      state.routine.page = action.payload.data.page
      state.routine.total = action.payload.data.total
    })

    builder.addCase(getListDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_DAILY_ROUTINES_LOADING] = false
    })

    // delete routine
    builder.addCase(deleteDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.DELETE_DAILY_ROUTINE_LOADING] = true
    })

    builder.addCase(deleteDailyRoutineAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.DELETE_DAILY_ROUTINE_LOADING] = false
    })

    builder.addCase(deleteDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.DELETE_DAILY_ROUTINE_LOADING] = false
    })

    // get detail routine
    builder.addCase(getDetailDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_DETAIL_DAILY_ROUTINE_LOADING] = true
    })

    builder.addCase(getDetailDailyRoutineAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    builder.addCase(getDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    // post detail routine
    builder.addCase(postDetailDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.POST_DETAIL_DAILY_ROUTINE_LOADING] =
        true
    })

    builder.addCase(postDetailDailyRoutineAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.POST_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    builder.addCase(postDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.POST_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    // put detail routine
    builder.addCase(putDetailDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.PUT_DETAIL_DAILY_ROUTINE_LOADING] = true
    })

    builder.addCase(putDetailDailyRoutineAction.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.PUT_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    builder.addCase(putDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.PUT_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    // get list jobs
    builder.addCase(getListJobsDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_JOBS_DAILY_ROUTINE_LOADING] =
        true
    })

    builder.addCase(
      getListJobsDailyRoutineAction.fulfilled,
      (state, action) => {
        state.loadings[thunkActionLoading.GET_LIST_JOBS_DAILY_ROUTINE_LOADING] =
          false
        state.job.jobs = action.payload.data.items
        state.job.limit = action.payload.data.limit
        state.job.page = action.payload.data.page
        state.job.total = action.payload.data.total
      }
    )

    builder.addCase(getListJobsDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_JOB_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    // get detail job
    builder.addCase(getJobDetailDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.GET_JOB_DETAIL_DAILY_ROUTINE_LOADING] =
        true
    })
    builder.addCase(deleteChallenge.pending, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES] = true
    })
    builder.addCase(deleteChallenge.fulfilled, (state, action) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES] = false
      // const updateList = [...state.challenges.challenges]
      // state.challenges.challenges = updateList
    })
    builder.addCase(deleteChallenge.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_CHALLENGES] = false
    })
    builder.addCase(
      getJobDetailDailyRoutineAction.fulfilled,
      (state, action) => {
        state.loadings[
          thunkActionLoading.GET_JOB_DETAIL_DAILY_ROUTINE_LOADING
        ] = false
      }
    )

    builder.addCase(getJobDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.GET_LIST_JOBS_DAILY_ROUTINE_LOADING] =
        false
    })

    // get detail job
    builder.addCase(putJobDetailDailyRoutineAction.pending, (state) => {
      state.loadings[thunkActionLoading.PUT_JOB_DETAIL_DAILY_ROUTINE_LOADING] =
        true
    })

    builder.addCase(
      putJobDetailDailyRoutineAction.fulfilled,
      (state, action) => {
        state.loadings[
          thunkActionLoading.PUT_JOB_DETAIL_DAILY_ROUTINE_LOADING
        ] = false
      }
    )

    builder.addCase(putJobDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[thunkActionLoading.PUT_JOB_DETAIL_DAILY_ROUTINE_LOADING] =
        false
    })

    // delete detail job
    builder.addCase(deleteJobDetailDailyRoutineAction.pending, (state) => {
      state.loadings[
        thunkActionLoading.DELETE_JOB_DETAIL_DAILY_ROUTINE_LOADING
      ] = true
    })

    builder.addCase(
      deleteJobDetailDailyRoutineAction.fulfilled,
      (state, action) => {
        state.loadings[
          thunkActionLoading.DELETE_JOB_DETAIL_DAILY_ROUTINE_LOADING
        ] = false
      }
    )

    builder.addCase(deleteJobDetailDailyRoutineAction.rejected, (state) => {
      state.loadings[
        thunkActionLoading.DELETE_JOB_DETAIL_DAILY_ROUTINE_LOADING
      ] = false
    })
  },
})

export const habitActions = {
  ...habitSlice.actions,
}

export const selectHabitLoading = (state: RootState, name: string) =>
  state.habit.loadings[`${name}`]
export const selectChallengeLoading = (state: RootState, name: string) =>
  state.habit.loadings[`${name}`]
export default habitSlice.reducer
