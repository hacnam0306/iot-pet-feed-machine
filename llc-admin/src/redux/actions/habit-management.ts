import { createAsyncThunk } from '@reduxjs/toolkit'
import { habitManagementAPI } from 'src/api/habit-management'
import {
  IChallengeFormCreate,
  ICreateGoalRequest,
  IGetQuestionParams,
  IGetRoutineParams,
  IGoalItem,
  IMissionFormCreate,
  IQuestionCreateFormData,
  TJobForm,
  TRoutineFormData,
  TStartingScreenForm,
} from 'src/interfaces/habit-management'

export const getListGoalsAction = createAsyncThunk(
  'goals/get',
  async (data: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
    isDailyRoutine?: boolean
    isChallenge?: boolean
  }) => {
    try {
      const res = await habitManagementAPI.getListGoal(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createGoalAction = createAsyncThunk(
  'goals/create',
  async (data: ICreateGoalRequest) => {
    try {
      const res = await habitManagementAPI.createGoal(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateGoalAction = createAsyncThunk(
  'goals/update',
  async ({ data, id }: { data: Partial<ICreateGoalRequest>; id: number }) => {
    try {
      const res = await habitManagementAPI.updateGoal(data, id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteGoalAction = createAsyncThunk(
  'goals/delete',
  async (id: number) => {
    try {
      const res = await habitManagementAPI.deleteGoal(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

// Question management
export const getListQuestionAction = createAsyncThunk(
  'questions/get',
  async (data: IGetQuestionParams) => {
    try {
      const res = await habitManagementAPI.getListQuestion(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const createQuestionAction = createAsyncThunk(
  'questions/create',
  async (data: IQuestionCreateFormData) => {
    try {
      const res = await habitManagementAPI.createQuestion(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateQuestionAction = createAsyncThunk(
  'questions/update',
  async ({
    data,
    id,
  }: {
    data: Partial<IQuestionCreateFormData>
    id: number
  }) => {
    try {
      const res = await habitManagementAPI.updateQuestion(data, id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteQuestionAction = createAsyncThunk(
  'questions/delete',
  async (itemId: number) => {
    try {
      const res = await habitManagementAPI.deleteQuestion(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListChallengerAction = createAsyncThunk(
  'challenges/get',
  async (data?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
    goalId?: IGoalItem['id']
  }) => {
    try {
      const res = await habitManagementAPI.getLisChallengers(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteChallenge = createAsyncThunk(
  'challenges/delete',
  async (itemId: number) => {
    try {
      const res = await habitManagementAPI.deleteChallenge(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const createChallengeAction = createAsyncThunk(
  'challenges/create',
  async (data: Omit<IChallengeFormCreate, 'isDraft'>) => {
    try {
      const res = await habitManagementAPI.createChallenge(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const duplicateChallengeAction = createAsyncThunk(
  'challenges/duplicate',
  async ({ id }: { id: number }) => {
    try {
      const res = await habitManagementAPI.duplicateChallenge(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const updateChallengeAction = createAsyncThunk(
  'challenges/update',
  async ({ data, id }: { data: Partial<IChallengeFormCreate>; id: number }) => {
    try {
      const res = await habitManagementAPI.updateChallengeById(data, id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListChallengerByIdAction = createAsyncThunk(
  'challenges/get',
  async (id: number) => {
    try {
      const res = await habitManagementAPI.getChallengeById(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListChallengerUsersByIdAction = createAsyncThunk(
  'challenges/users/get',
  async (data: { page?: number; limit?: number; id?: number }) => {
    try {
      const res = await habitManagementAPI.getChallengeUsersById(data)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListMissionAction = createAsyncThunk(
  'missions/get',
  async (data?: {
    page?: number
    limit?: number
    search?: string
    status?: boolean
    challengeId?: number
  }) => {
    try {
      const res = await habitManagementAPI.getListMissions(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteMission = createAsyncThunk(
  'missions/delete',
  async (itemId: number) => {
    try {
      const res = await habitManagementAPI.deleteMission(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const createMissionAction = createAsyncThunk(
  'missions/create',
  async (data: IMissionFormCreate) => {
    try {
      const res = await habitManagementAPI.createMission(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const updateMissionAction = createAsyncThunk(
  'missions/update',
  async ({ data, id }: { data: Partial<IChallengeFormCreate>; id: number }) => {
    try {
      const res = await habitManagementAPI.updateMissionById(data, id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListMissionByIdAction = createAsyncThunk(
  'missions/get',
  async (id: number) => {
    try {
      const res = await habitManagementAPI.getMissionById(id)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const getListMissionUserByIdAction = createAsyncThunk(
  'missionsUser/get',
  async ({ clid, userId }: { clid: number; userId: number }) => {
    try {
      const res = await habitManagementAPI.getMissionUser(clid, userId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/get',
  async (data?: IGetRoutineParams) => {
    try {
      const res = await habitManagementAPI.getListRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/delete',
  async (itemId: number) => {
    try {
      const res = await habitManagementAPI.deleteRoutine(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)
export const duplicateDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/dup',
  async (itemId: number) => {
    try {
      const res = await habitManagementAPI.dupRoutine(itemId)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/getDetail',
  async (id: number) => {
    try {
      const res = await habitManagementAPI.getDetailRoutine(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const postDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/postRoutine',
  async (data: TRoutineFormData) => {
    try {
      const res = await habitManagementAPI.postDetailRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const putDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/putRoutine',
  async (data: TRoutineFormData & { id: string }) => {
    try {
      const res = await habitManagementAPI.putDetailRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getListJobsDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/getList',
  async (data: IGetRoutineParams) => {
    try {
      const res = await habitManagementAPI.getListJobRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const postJobDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/postJob',
  async (data: TJobForm) => {
    try {
      const res = await habitManagementAPI.postJobDetailRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getJobDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/getJob',
  async (id: string | number) => {
    try {
      const res = await habitManagementAPI.getJobDetailRoutine(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const putJobDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/putJob',
  async (data: TJobForm & { id: string | number }) => {
    try {
      const res = await habitManagementAPI.putJobDetailRoutine(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const deleteJobDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/deleteJob',
  async (id: string | number) => {
    try {
      const res = await habitManagementAPI.deleteJobDetailRoutine(id)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const postStartingDetailDailyRoutineAction = createAsyncThunk(
  'dailyRoutine/postStartingScreenContent',
  async (data: TStartingScreenForm) => {
    try {
      const res = await habitManagementAPI.postStartingScreenContent(data)
      return res
    } catch (error) {
      throw error
    }
  }
)

export const getStartingScreenContentAction = createAsyncThunk(
  'dailyRoutine/getStartingScreenContent',
  async () => {
    try {
      const res = await habitManagementAPI.getStartingScreenContent()
      return res
    } catch (error) {
      throw error
    }
  }
)
