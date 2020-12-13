import { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '@app/data/auth';
interface ProtectedRouteProps extends RouteProps {
  children: React.ReactNode 
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);
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