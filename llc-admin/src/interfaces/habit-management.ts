import { EHabitGoalStatus } from '@configs'
import { Media } from './aboutus-management'
import { User } from './auth'

export interface HabitGoalFormData {
  goal: string
  goalInDutch: string
  status: boolean
  mediaId?: number
  media?: Media
  isDailyRoutine?: boolean
  isChallenge?: boolean
}

export interface IGoalItem {
  id: number
  goal: string
  goalInDutch: string
  status: boolean
  createdAt: string
  updatedAt: string
  deletedAt: string | null
  media?: Media
}

export interface IGetGoalParams {
  page?: number
  limit?: number
  search?: string
  status?: boolean
  goal?: number
}
export interface IGetMissionParams {
  page?: number
  limit?: number
  search?: string
  status?: boolean
  challengeId?: number
}

export interface IGetGoalSuccessData {
  items: IGoalItem[]
  limit: number
  page: number
  total: number
}

export interface ICreateGoalRequest extends HabitGoalFormData {}
export interface IChallengeItem {
  id: number
  mediaId: number
  challenge: string
  challengeInDutch: string
  goalId: number
  status: boolean
  isDraft: boolean
  createdAt: Date
  updatedAt: Date
  goal: IGoalItem
  media: Media
  no: number
  missionsNumber: number
  deletedAt?: string
}
export interface IGetChallengeSuccessData {
  items: IChallengeItem[]
  limit: number
  page: number
  total: number
}

export interface IQuestionItem {
  id: number
  goalId: number
  question: string
  questionInDutch: string
  multipleChoice: boolean
  answers: Answer[]
  status: boolean
  position: number
  createdAt: string
  updatedAt: string
  deletedAt: null
}

export interface Answer {
  point: number
  answer: string
  answerInDutch: string
}

export interface IGetQuestionParams {
  page?: number
  limit?: number
  search?: string
  status?: boolean
  question?: number
  goalId?: number
}

export interface IGetQuestionSuccessData {
  items: IQuestionItem[]
  limit: number
  page: number
  total: number
}
export interface IGetMissionSuccessData {
  items: IMissionsItem[]
  limit: number
  page: number
  total: number
}

export interface IGetUserChallengeSuccessData {
  items: UserChallenge[]
  limit: number
  page: number
  total: number
}
export type IChallengeFormData = Omit<IChallengeItem, 'id'>
export interface IChallengeFormCreate {
  challenge: string
  challengeInDutch: string
  mediaId: number | null
  goalId: number
  applyFrom: number
  applyTo: number
  description: string
  descriptionInDutch: string
  status: boolean
  isDraft: boolean
}

export interface UserChallenge {
  userId: number
  challengeId: number
  createdAt: Date
  updatedAt: Date
  user: User
  completedNumber: number
  missionNumber: number
  status: string
}
export interface IMissionsItem {
  id: number
  challengeId: number
  mission: string
  missionInDutch: string
  description: string
  descriptionInDutch: string
  mediaIds: number[]
  status: boolean
  createdAt: Date
  updatedAt: Date
  deletedAt: null
  mediaList: Media[]
}
export interface IMissionFormCreate {
  mission: string
  missionInDutch: string
  description: string
  descriptionInDutch: string
  challengeId: number
  mediaIds: number[]
  status: boolean
  position: number
}

export interface IQuestionCreateFormData {
  question: string
  questionInDutch: string
  goalId: number
  multipleChoice: boolean
  answers: Answer[]
  position: number
  status: boolean
}
export interface IChallengeFormDetail {
  challenge: string
  challengeInDutch: string
  description: string
  descriptionInDutch: string
  participantsNumber: number
  goal: string
  goalInDutch: string
}
export interface IMissionUser {
  id: number
  userId: number
  missionId: number
  note: string
  mediaId: Media[]
  isCompleted: boolean
  createdAt: Date
  updatedAt: Date
  mission: IMissionsItem
}

export interface IRoutineItem {
  id: number
  mediaId: number
  title: string
  titleInDutch: string
  description: string
  descriptionInDutch: string
  isDefault: boolean
  isDraft: boolean
  jobs: Job[]
  jobsNumber: number
  status: boolean
  type: string
  createdAt: string
  deletedAt: string
  updatedAt: string
  media: Media
  goalId?: string | number
  goal?: any
}

export interface IGetRoutineParams {
  page?: number
  limit?: number
  search?: string
  isDefault?: boolean
  type?: string
  status?: boolean
  isDraft?: boolean
  dailyRoutineId?: string
  goalId?: string | number
}

export interface IGetRoutineSuccessData {
  items: IRoutineItem[]
  limit: number
  page: number
  total: number
}

export interface Job {}

export type TRoutineFormData = Partial<
  Pick<
    IRoutineItem,
    | 'type'
    | 'title'
    | 'titleInDutch'
    | 'description'
    | 'descriptionInDutch'
    | 'isDefault'
    | 'status'
    | 'isDraft'
    | 'mediaId'
    | 'goalId'
  >
>

export type TRoutinePayload = {
  mediaId?: number
  title?: string
  titleInDutch?: string
  description?: string
  descriptionInDutch?: string
  isDefault?: boolean
  isDraft?: boolean
  status?: boolean
  type?: string
}

export type TJobRoutineItem = {
  createdAt: string
  dailyRoutineId: number
  description: string
  descriptionInDutch: string
  id: number
  media: Media
  mediaId: number
  status: boolean
  title: string
  titleInDutch: string
  updatedAt: string
}

export interface IGetListSuccessData<T> {
  items: T[]
  limit: number
  page: number
  total: number
}

export type TJobForm = {
  title?: string
  titleInDutch?: string
  mediaId?: number
  description?: string
  descriptionInDutch?: string
  dailyRoutineId?: number
  status?: boolean
}

export type TAnswer = {
  id: number
  title: string
  titleInDutch: string
}

export type TStartingScreenForm = {
  title?: string
  titleInDutch?: string
  content?: string
  contentInDutch?: string
  question?: string
  questionInDutch?: string
  answers: TAnswer[]
}
