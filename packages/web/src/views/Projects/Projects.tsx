import { useContext } from "react";
import { AuthContext } from '@app/data/auth';
import { Link } from 'react-router-dom';

import CreateProject from './Create';

const Projects = () => {
  const auth = useContext(AuthContext);
  const handleSignOut = () => auth.signOut();

  return (
    <div>
      <Link to="/create">
        creatte
      </Link>

      <CreateProject />
    </div>
  );
};

export default Projects;
