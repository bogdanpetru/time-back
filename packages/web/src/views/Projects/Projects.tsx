import { useContext } from 'react';
import { Button } from '@app/components';
import authContext from '../../providers/auth';

const Projects = () => {
  const auth = useContext(authContext);
  const handleSignOut = () => auth.signOut();

  return <div>
    <Button onClick={handleSignOut}>signout</Button>
    
    projects
    
  </div>
}

export default Projects;