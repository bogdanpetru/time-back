import { FunctionComponent } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { isUserSignedIn } from '@app/api/auth'

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const isAuthenticated = isUserSignedIn()

  if (!isAuthenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...props}>{props.children}</Route>
}

export default ProtectedRoute
