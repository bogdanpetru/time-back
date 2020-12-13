import { useState, useEffect }  from 'react';
import AuthService, { AuthConfig } from './service';

function useAuth (config: AuthConfig) {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [authService, setAuthService] = useState<AuthService>(null);

  useEffect(() => {
    const authServiceInstance = AuthService.of(config);
    setAuthService(authServiceInstance);
    (async() => {
      try {
        await authServiceInstance.init();
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    })()
    
  }, [AuthService])

  return {authService, loading, error};
}

export default useAuth;