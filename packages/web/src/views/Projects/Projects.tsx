import { signOut } from '@app/data/auth';
import { Button } from '@app/components';


const Projects = () => {
  const handleSignOut = () => signOut();

  return <div>
    <Button onClick={handleSignOut}>signout</Button>
    
    projects
    
  </div>
}

export default Projects;