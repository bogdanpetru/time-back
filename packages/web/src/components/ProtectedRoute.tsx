import { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import authContext from '../providers/auth';

interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode 
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const auth = useContext(authContext);
  const isAuthenticated = auth.isUserSignedIn();
  
  console.log('dude');
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