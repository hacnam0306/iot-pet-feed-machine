import Cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

import { LLC_ACCESS_TOKEN, PATH_DASHBOARD } from '@configs'

interface IPublicRouteProps {
  restricted?: boolean
}

export const PublicRoute = (props: IPublicRouteProps) => {
  const { restricted } = props
  const accessToken = Cookies.get(LLC_ACCESS_TOKEN)

  return restricted && accessToken ? (
    <Navigate to={PATH_DASHBOARD} />
  ) : (
    <Outlet />
  )
}
