import { signOut } from '@app/data/auth'
import { Switch, Route } from 'react-router-dom'

import { CreateProject, EditProject } from './EditCreateProject'

const Projects = () => {
  return (
    <Switch>
      <Route exact path="/" component={CreateProject} />
      <Route path="/:projectId" component={EditProject} />
    </Switch>
  )
}

export default Projects
