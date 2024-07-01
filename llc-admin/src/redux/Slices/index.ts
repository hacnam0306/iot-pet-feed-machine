import { combineReducers } from 'redux'
import { AnyAction, Reducer } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

import toastReducer from './toast'
import appReducer from './app'
import authReducer from './auth'
import layoutReducer from './layout'
import tierReducer from './tier'
import userSlice from './userSlice'
import usersSlice from './user-management'
import contentSlice from './content-management'
import notificationsSlice from './notification-management'
import dashboardSlice from './dashboard'
import planReducer from './plan'
import roleReducer from './role-management'
import packageReducer from './package-management'
import categoriesReducer from './category-management'
import { LLC_ACCESS_TOKEN } from '@configs'
import userLogReducer from './user-log'
import chatReducer from './chat'
import blogReducer from './blog-news'
import courseReducer from './course'
import emailSubscribed from './email-subscribed'
import aboutusManagementReducer from './aboutus-management'
import galleryReducer from './gallery'
import habitReducer from './habit-management'
import postReducer from './post-management'
import groupUserReducer from './group-user-management'
import emailContentReducer from './email-content-management'
import homeContentReducer from './home-page-management'
import seoConfigReducer from './seo-config'
import lessonReducer from './lesson'

export * from './toast'
export * from './app'
export * from './auth'
export * from './layout'
export * from './tier'
export * from './userSlice'
export * from './user-management'
export * from './notification-management'
export * from './dashboard'
export * from './plan'
export * from './role-management'
export * from './package-management'
export * from './content-management'
export * from './user-log'
export * from './chat'
export * from './blog-news'
export * from './course'
export * from './aboutus-management'
export * from './gallery'
export * from './habit-management'
export * from './group-user-management'
export * from './email-content-management'
export * from './seo-config'
export * from './lesson'

const productReducer = combineReducers({
  toast: toastReducer,
  app: appReducer,
  auth: authReducer,
  layout: layoutReducer,
  tier: tierReducer,
  user: userSlice,
  plans: planReducer,
  users: usersSlice,
  notifications: notificationsSlice,
  dashboard: dashboardSlice,
  role: roleReducer,
  package: packageReducer,
  userLog: userLogReducer,
  content: contentSlice,
  chat: chatReducer,
  categories: categoriesReducer,
  emailsSub: emailSubscribed,
  blog: blogReducer,
  course: courseReducer,
  lesson: lessonReducer,
  aboutUsManagement: aboutusManagementReducer,
  gallery: galleryReducer,
  habit: habitReducer,
  post: postReducer,
  groupUser: groupUserReducer,
  emailContent: emailContentReducer,
  homePageManagement: homeContentReducer,
  seoConfig: seoConfigReducer,
})

export type RootState = ReturnType<typeof productReducer>

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === 'RESET') {
    // reset state
    state = {} as RootState
    // reset local storage
    Cookies.remove(LLC_ACCESS_TOKEN)
    sessionStorage.clear()
  }
  return productReducer(state, action)
}
export default rootReducer
