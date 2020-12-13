import { useContext } from "react";
import { Button } from "@app/components";
import { AuthContext } from '@app/data/auth';

const Projects = () => {
  const auth = useContext(AuthContext);
  const handleSignOut = () => auth.signOut();

  return (
    <div>
      <Button onClick={handleSignOut}>signout</Button>
      projects
    </div>
  );
};

export default Projects;
