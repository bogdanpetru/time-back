import { Route, Redirect, RouteProps } from 'react-router-dom';

import { isUserSignedIn } from '@app/data/auth';

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode 
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const isAuthenticated = isUserSignedIn();
  

  if (!isAuthenticated) {
    return (
      <Redirect
        to="/login"
      />
    );
  }

  return (
    <Route {...props}>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;