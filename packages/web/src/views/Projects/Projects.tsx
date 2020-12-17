import { signOut } from '@app/data/auth'
import { Link } from 'react-router-dom'

import EditCreateProject from './EditCreateProject'

const Projects = () => {
  const handleSignOut = () => signOut()

  return (
    <div>
      <Link to="/create">creatte</Link>

      <EditCreateProject />
    </div>
  )
}

export default Projects
