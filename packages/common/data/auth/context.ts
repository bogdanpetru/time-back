import { createContext } from 'react'; 

import AuthSerice from './service';

const AuthContext = createContext<AuthSerice>(null);

export default AuthContext;