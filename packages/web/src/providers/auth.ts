import { createContext } from 'react'; 

import AuthSerice from '@app/data/auth';

const AuthContext = createContext<AuthSerice>(null);

export default AuthContext;
