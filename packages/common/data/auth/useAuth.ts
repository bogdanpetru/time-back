import { useState, useEffect }  from 'react';
import AuthSerice, { AuthConfig } from './service';

const useAuth = (config: AuthConfig)  => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [authService, setAuthService] = useState<AuthSerice>(null);

  useEffect(() => {
    const authServiceInsance = AuthSerice.of(config);
    setAuthService(authServiceInsance);
    (async() => {
      try {
        await authServiceInsance.init();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })()
    
  }, [AuthSerice])

  return {authService, loading, error};
}

export default useAuth;