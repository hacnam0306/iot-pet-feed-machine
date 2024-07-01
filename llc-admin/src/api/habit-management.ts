import {
  IChallengeFormCreate,
  IChallengeItem,
  ICreateGoalRequest,
  IGetChallengeSuccessData,
  IGetGoalParams,
  IGetGoalSuccessData,
  IGetListSuccessData,
  IGetMissionParams,
  IGetMissionSuccessData,
  IGetQuestionParams,
  IGetQuestionSuccessData,
  IGetRoutineParams,
  IGetRoutineSuccessData,
  IGetUserChallengeSuccessData,
  IGoalItem,
  IMissionFormCreate,
  IMissionUser,
  IMissionsItem,
  IQuestionCreateFormData,
  IQuestionItem,
  IRoutineItem,
  TJobForm,
  TJobRoutineItem,
  TRoutineFormData,
  TStartingScreenForm,
} from 'src/interfaces/habit-management'
import { ApiClient } from './axiosClient'

export const habitManagementAPI = {
  getListGoal: async (params: IGetGoalParams) => {
    const { status, ...rest } = params
    return await ApiClient.get<IGetGoalSuccessData>('/goals', {
      params,
    })
  },

  createGoal: async (data: ICreateGoalRequest) => {
    return await ApiClient.post<{
      message: string
      newGoal: IGoalItem
    }>('/goals', data)
  },

  updateGoal: async (data: Partial<ICreateGoalRequest>, id: number) => {
    return await ApiClient.put<{
      message: string
      updatedGoal: IGoalItem
    }>(`/goals/${id}`, data)
  },

  deleteGoal: async (id: number) => {
    return await ApiClient.delete(`/goals/${id}`)
  },

  // Question management
  getListQuestion: async (params: IGetQuestionParams) => {
    const { goalId, ...rest } = params

    if (goalId) {
      return await ApiClient.get<IGetQuestionSuccessData>(
        `/first-questions?goalId=${goalId}`,
        {
          params: rest,
        }
      )
    } else {
      return await ApiClient.get<IGetQuestionSuccessData>('/first-questions', {
        params,
      })
    }
  },

  createQuestion: async (data: IQuestionCreateFormData) => {
    return await ApiClient.post<{
      message: string
      newFirstQuestion: IQuestionItem
    }>('/first-questions', data)
  },

  updateQuestion: async (
    data: Partial<IQuestionCreateFormData>,
    id: number
  ) => {
    return await ApiClient.put<{
      message: string
      updatedFirstQuestion: IQuestionItem
    }>(`/first-questions/${id}`, data)
  },

  deleteQuestion: async (id: number) => {
    return await ApiClient.delete(`/first-questions/${id}`)
  },

  getLisChallengers: async (params?: IGetGoalParams) => {
    return await ApiClient.get<IGetChallengeSuccessData>('/challenges', {
      params,
    })
  },
  deleteChallenge: async (id: number) => {
    return await ApiClient.delete(`/challenges/${id}`)
  },
  createChallenge: async (data: Omit<IChallengeFormCreate, 'isDraft'>) => {
    return await ApiClient.post<{
      message: string
      newChallenge: IChallengeItem
    }>('/challenges', data)
  },
  getChallengeById: async (id: number) => {
    return await ApiClient.get(`/challenges/${id}`)
  },
  getChallengeUsersById: async (data: {
    page?: number
    limit?: number
    id?: number
  }) => {
    const { id, ...params } = data
    return await ApiClient.get<IGetUserChallengeSuccessData>(
      `/challenges/users/${id}`,
      {
        params,
      }
    )
  },
  updateChallengeById: async (
    data: Partial<IChallengeFormCreate>,
    id: number
  ) => {
    return await ApiClient.put<{
      message: string
      updatedGoal: IChallengeItem
    }>(`/challenges/${id}`, data)
  },
  duplicateChallengeById: async (id: number) => {
    return await ApiClient.post<{
      message: string
      newChallenge: IChallengeItem
    }>(`/challenges/${id}`)
  },
  getListMissions: async (params?: IGetMissionParams) => {
    return await ApiClient.get<IGetMissionSuccessData>('/missions', {
      params,
    })
  },
  deleteMission: async (id: number) => {
    return await ApiClient.delete(`/missions/${id}`)
  },
  createMission: async (data: IMissionFormCreate) => {
    return await ApiClient.post<{
      message: string
      newChallenge: IMissionsItem
    }>('/missions', data)
  },
  getMissionById: async (id: number) => {
    return await ApiClient.get(`/missions/${id}`)
  },
  updateMissionById: async (
    data: Partial<IChallengeFormCreate>,
    id: number
  ) => {
    return await ApiClient.put<{
      message: string
      updatedGoal: IMissionsItem
    }>(`/missions/${id}`, data)
  },
  getMissionUser: async (clid: number, userId: number) => {
    return await ApiClient.get<IMissionUser[]>(`/missions/${clid}/${userId}`)
  },

  // Routine management
  getListRoutine: async (params?: IGetRoutineParams) => {
    return await ApiClient.get<IGetRoutineSuccessData>('/daily-routines', {
      params,
    })
  },
  deleteRoutine: async (id: number) => {
    return await ApiClient.delete(`/daily-routines/${id}`)
  },
  dupRoutine: async (id: number) => {
    return await ApiClient.post(`/daily-routines/${id}`)
  },
  getDetailRoutine: async (id: number) => {
    return await ApiClient.get<IRoutineItem>(`/daily-routines/${id}`)
  },

  postDetailRoutine: async (data: TRoutineFormData) => {
    return await ApiClient.post<{
      message: string
      newDailyRoutine: IRoutineItem
    }>(`/daily-routines`, data)
  },
  duplicateChallenge: async (id: number) => {
    return await ApiClient.post<{
      message: string
      newChallenge: IChallengeItem
    }>(`/challenges/${id}`)
  },
  putDetailRoutine: async ({
    id,
    ...data
  }: TRoutineFormData & { id: string }) => {
    return await ApiClient.put<{
      message: string
      updatedGoal: IRoutineItem
    }>(`/daily-routines/${id}`, data)
  },

  getListJobRoutine: async (params?: IGetRoutineParams) => {
    return await ApiClient.get<IGetListSuccessData<TJobRoutineItem>>('/jobs', {
      params,
    })
  },

  postJobDetailRoutine: async (data: TJobForm) => {
    return await ApiClient.post<{
      message: string
      newJob: TJobRoutineItem
    }>('/jobs', data)
  },

  getJobDetailRoutine: async (id: string | number) => {
    return await ApiClient.get<TJobRoutineItem>(`/jobs/${id}`)
  },

  putJobDetailRoutine: async (data: TJobForm & { id: string | number }) => {
    const { id, ...passData } = data
    return await ApiClient.put<{
      message: string
      newJob: TJobRoutineItem
    }>(`/jobs/${id}`, passData)
  },

  deleteJobDetailRoutine: async (id: string | number) => {
    return await ApiClient.delete<{
      message: string
      newJob: TJobRoutineItem
    }>(`/jobs/${id}`)
  },

  postStartingScreenContent: async (data: TStartingScreenForm) => {
    return await ApiClient.post<{
      message: string
      newStartingScreen: TStartingScreenForm
    }>(`/starting-screens`, data)
  },

  getStartingScreenContent: async () => {
    return await ApiClient.get<TStartingScreenForm>(`/starting-screens`)
  },
}
