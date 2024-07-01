import { PATH_DASHBOARD_OK, PATH_DEVICE } from './navigation'
import { IRoute } from '@interfaces'
import { Dashboard, ForgotPasswordPage, LoginPage } from '@pages'
import { InitPasswordAdminPage } from 'src/pages/auth/InitPasswordAdminPage'

import {
  PATH_DASHBOARD,
  // PATH_EDIT_USER,
  PATH_FORGOT_PASSWORD,
  PATH_INIT_PASSWORD_ADMIN,
  PATH_LOGIN,
} from 'src/routes/navigation'
import { ListDevice } from 'src/pages/dashboard/ListDevices'

export const routes: Array<IRoute> = [
  // { path: PATH_DETAIL_PLAN, element: PlanDetail },
  // { path: PATH_PLAN, element: PlanManagement },
  { path: PATH_DEVICE, element: ListDevice },
  { path: PATH_DASHBOARD_OK, element: Dashboard },
  // { path: PATH_USER_MANAGEMENT, element: UserManagementPage },
  // { path: PATH_EDIT_USER, element: UserDetailPage },
]

export const publicRoutes: Array<IRoute> = [
  //auth
]

export const restrictedRoutes: Array<IRoute> = [
  //auth
  { path: PATH_LOGIN, element: LoginPage },
  { path: PATH_FORGOT_PASSWORD, element: ForgotPasswordPage },
  { path: PATH_INIT_PASSWORD_ADMIN, element: InitPasswordAdminPage },
]
